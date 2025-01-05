package com.mohakgupt.portfoliotrackerbackend.controller;

import com.mohakgupt.portfoliotrackerbackend.model.Stock;
import com.mohakgupt.portfoliotrackerbackend.service.StockService;
import com.mohakgupt.portfoliotrackerbackend.service.AlphaVantageService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/stocks")
public class StockController {

    private final StockService stockService;
    private final AlphaVantageService alphaVantageService;

    public StockController(StockService stockService, AlphaVantageService alphaVantageService) {
        this.stockService = stockService;
        this.alphaVantageService = alphaVantageService;
    }

    @GetMapping
    public ResponseEntity<List<Stock>> getAllStocks() {
        return ResponseEntity.ok(stockService.getAllStocks());
    }

    @GetMapping("/quote/{symbol}")
    public ResponseEntity<Map<String, Object>> getStockQuote(@PathVariable String symbol) {
        return ResponseEntity.ok(alphaVantageService.getStockQuote(symbol));
    }

    @GetMapping("/metrics")
    public ResponseEntity<Map<String, Object>> getPortfolioMetrics() throws IOException {
        return ResponseEntity.ok(stockService.getPortfolioMetrics());
    }

    @PostMapping
    public ResponseEntity<Stock> addStock(@RequestBody Stock stock) {
        return ResponseEntity.ok(stockService.addStock(stock));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Stock> updateStock(@PathVariable Long id, @RequestBody Stock stock) {
        return ResponseEntity.ok(stockService.updateStock(id, stock));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteStock(@PathVariable Long id) {
        stockService.deleteStock(id);
        return ResponseEntity.noContent().build();
    }
}