package com.mohakgupt.portfoliotrackerbackend.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonSetter;

@JsonIgnoreProperties(ignoreUnknown = true)
public class StockQuoteResponse {
    private double price;

    public double getPrice() {
        return price;
    }

    @JsonSetter("05. price")
    public void setPrice(double price) {
        this.price = price;
    }
}
