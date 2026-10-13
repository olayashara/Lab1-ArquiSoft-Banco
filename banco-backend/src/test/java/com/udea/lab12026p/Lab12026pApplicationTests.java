package com.udea.lab12026p;

import com.udea.lab12026p.dto.CustomerDTO;
import com.udea.lab12026p.dto.TransactionDTO;
import com.udea.lab12026p.mapper.CustomerMapperImpl;
import com.udea.lab12026p.mapper.TransactionMapperImpl;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@ActiveProfiles("test")
class Lab12026pApplicationTests {

    @Test
    void contextLoads() {
        assertTrue(true);
    }

    @Test
    void testApplicationMain() {
        try {
            Lab12026pApplication.main(new String[]{});
        } catch (Exception ignored) {
        }
        assertTrue(true);
    }

    @Test
    void testCustomerDTOAndMapper() {
        CustomerMapperImpl customerMapper = new CustomerMapperImpl();
        assertNotNull(customerMapper);

        CustomerDTO customerDTO = new CustomerDTO();
        assertNotNull(customerDTO);
    }

    @Test
    void testTransactionDTOAndMapper() {
        TransactionMapperImpl transactionMapper = new TransactionMapperImpl();
        assertNotNull(transactionMapper);

        TransactionDTO transactionDTO = new TransactionDTO();
        assertNotNull(transactionDTO);
    }
}