package com.mohakgupt.portfoliotrackerbackend.service;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.mohakgupt.portfoliotrackerbackend.model.Stock;
import com.mohakgupt.portfoliotrackerbackend.model.StockQuoteResponse;
import com.mohakgupt.portfoliotrackerbackend.repository.StockRepository;
import org.springframework.stereotype.Service;

import java.io.DataInput;
import java.io.IOException;
import java.time.LocalDate;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class StockService {

    private final StockRepository stockRepository;
    private final AlphaVantageService alphaVantageService;

    public StockService(StockRepository stockRepository, AlphaVantageService alphaVantageService) {
        this.stockRepository = stockRepository;
        this.alphaVantageService = alphaVantageService;
    }

    public List<Stock> getAllStocks() {
        return stockRepository.findAll();
    }

    public Stock addStock(Stock stock) {
        return stockRepository.save(stock);
    }

    public Stock updateStock(Long id, Stock updatedStock) {
        return stockRepository.findById(id).map(stock -> {
            stock.setStockName(updatedStock.getStockName());
            stock.setTicker(updatedStock.getTicker());
            stock.setQuantity(updatedStock.getQuantity());
            stock.setBuyPrice(updatedStock.getBuyPrice());
            stock.setPurchaseDate(updatedStock.getPurchaseDate());
            return stockRepository.save(stock);
        }).orElseThrow(() -> new RuntimeException("Stock not found"));
    }

    public void deleteStock(Long id) {
        stockRepository.deleteById(id);
    }

    public Map<String, Object> getPortfolioMetrics() throws IOException {
        List<Stock> stocks = stockRepository.findAll();
        double totalInvested = stocks.stream()
                .mapToDouble(stock -> stock.getBuyPrice() * stock.getQuantity())
                .sum();

        Map<String, Double> currentPrices = new HashMap<>();
        for (Stock stock : stocks) {
            if (!currentPrices.containsKey(stock.getTicker())) {
                currentPrices.put(stock.getTicker(), (double) alphaVantageService.getStockQuote(stock.getTicker()).get("price"));
            }
        }
        System.out.println(currentPrices.toString());
        double totalCurrentValue = stocks.stream()
                .mapToDouble(stock -> currentPrices.get(stock.getTicker()) * stock.getQuantity())
                .sum();

        double rateOfReturn = totalInvested > 0 ? ((totalCurrentValue - totalInvested) / totalInvested) * 100 : 0;

        int totalInvestments = stocks.size();

        Map<Integer, Double> yearlyInvestment = stocks.stream()
                .collect(Collectors.groupingBy(
                        stock -> LocalDate.parse(stock.getPurchaseDate()).getYear(),
                        Collectors.summingDouble(stock -> stock.getBuyPrice() * stock.getQuantity())
                ));

        long currentYear = LocalDate.now().getYear();
        double totalCurrentYearInvestment = yearlyInvestment.getOrDefault((int) currentYear, 0.0);

        // Top-performing stock
        Stock topStock = stocks.stream()
                .max(Comparator.comparingDouble(stock -> currentPrices.get(stock.getTicker()) * stock.getQuantity()))
                .orElse(null);

        // Portfolio distribution
        Map<String, Double> portfolioDistribution = stocks.stream()
                .collect(Collectors.groupingBy(
                        Stock::getTicker,
                        Collectors.averagingDouble(stock -> (currentPrices.get(stock.getTicker()) * stock.getQuantity()) / totalCurrentValue * 100)
                ));
        System.out.println(portfolioDistribution.toString());
        return new HashMap<>() {{
            put("totalInvested", totalInvested);
            put("rateOfReturn", rateOfReturn);
            put("yearlyInvestment", yearlyInvestment);
            put("totalInvestments", totalInvestments);
            put("totalCurrentValue", totalCurrentValue);
            put("topPerformingStock", topStock != null ? Map.of(
                    "ticker", topStock.getTicker(),
                    "currentValue", currentPrices.get(topStock.getTicker()) * topStock.getQuantity()
            ) : null);
            put("portfolioDistribution", portfolioDistribution);

        }};
    }


}