package com.mohakgupt.portfoliotrackerbackend.service;

import com.mohakgupt.portfoliotrackerbackend.util.StockDataUtil;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.DefaultUriBuilderFactory;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.HashMap;
import java.util.Map;

@Service
public class AlphaVantageService {
    private final StockDataUtil stockDataUtil = new StockDataUtil();

//    private final String API_KEY = "OJE7IC30TWP9HNK4";
    private final String API_KEY = "demo";
    private final String BASE_URL = "https://www.alphavantage.co/query";

    public Map<String, Object> getStockQuote(String ticker) {
        RestTemplate restTemplate = new RestTemplate();
        DefaultUriBuilderFactory factory = new DefaultUriBuilderFactory(BASE_URL);
        factory.setEncodingMode(DefaultUriBuilderFactory.EncodingMode.VALUES_ONLY);
        restTemplate.setUriTemplateHandler(factory);

        String url = factory.builder()
                .queryParam("function", "GLOBAL_QUOTE")
                .queryParam("symbol", ticker)
                .queryParam("apikey", API_KEY)
                .toUriString();

        Map<String, Object> response = restTemplate.getForObject(url, Map.class);

        Map<String, Object> globalQuote = (Map<String, Object>) response.get("Global Quote");
        if(globalQuote == null) {
            return null;
        }
        // Extract price and look up the name
        String price = (String) globalQuote.get("05. price");
        String name = stockDataUtil.getStockName(ticker);

        // Return map with price and name
        Map<String, Object> result = new HashMap<>();
        result.put("price", Double.parseDouble(price));
        result.put("name", name);
        return result;
    }
}