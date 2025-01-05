package com.mohakgupt.portfoliotrackerbackend.repository;

import com.mohakgupt.portfoliotrackerbackend.model.Stock;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StockRepository extends JpaRepository<Stock, Long> {
}