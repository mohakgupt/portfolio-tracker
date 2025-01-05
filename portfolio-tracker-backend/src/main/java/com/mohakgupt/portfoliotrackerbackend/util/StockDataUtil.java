package com.mohakgupt.portfoliotrackerbackend.util;

import org.springframework.stereotype.Component;

import jakarta.annotation.PostConstruct;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.Map;

@Component
public class StockDataUtil {

    private Map<String, String> tickerToNameMap = new HashMap<>();

    @PostConstruct
    public void init() {
        try (BufferedReader br = new BufferedReader(new InputStreamReader(
                getClass().getClassLoader().getResourceAsStream("tickers.csv")))) {

            String line;
            while ((line = br.readLine()) != null) {
                String[] parts = line.split(",");
                if (parts.length == 2) {
                    tickerToNameMap.put(parts[0].trim(), parts[1].trim());
                }
            }
        } catch (Exception e) {
            throw new RuntimeException("Error reading stock data CSV", e);
        }
    }

    public String getStockName(String ticker) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        return tickerToNameMap.getOrDefault(ticker.trim(), "Stock-"+ LocalDateTime.now().format(formatter));
    }
}
