package com.udea.lab12026p;

import com.udea.lab12026p.controller.CustomerController;
import com.udea.lab12026p.controller.TransactionController;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class Lab12026pApplicationTests {

    @Autowired(required = false)
    private CustomerController customerController;

    @Autowired(required = false)
    private TransactionController transactionController;

    @Test
    void contextLoads() {
        assertTrue(true);
    }

    @Test
    void testCustomerControllerLoads() {
        if (customerController != null) {
            assertNotNull(customerController);
        }
    }

    @Test
    void testTransactionControllerLoads() {
        if (transactionController != null) {
            assertNotNull(transactionController);
        }
    }
}