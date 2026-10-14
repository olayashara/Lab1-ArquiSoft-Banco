package com.udea.lab12026p;

import com.udea.lab12026p.controller.CustomerController;
import com.udea.lab12026p.dto.CustomerDTO;
import com.udea.lab12026p.service.CustomerService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.ActiveProfiles;

import java.util.Collections;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.when;

@SpringBootTest
@ActiveProfiles("test")
class Lab12026pApplicationTests {

    @Autowired
    private CustomerController customerController;

    @MockitoBean
    private CustomerService customerService;

    @Test
    void contextLoads() {
        assertNotNull(customerController);
    }

    @Test
    void testGetAllCustomers() {
        when(customerService.getAllCustomers()).thenReturn(Collections.emptyList());
        ResponseEntity<List<CustomerDTO>> response = customerController.getAllCustomers();
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
    }

    @Test
    void testGetCustomerById() {
        CustomerDTO dto = new CustomerDTO();
        when(customerService.getCustomerById(1L)).thenReturn(dto);
        ResponseEntity<CustomerDTO> response = customerController.getCustomerById(1L);
        assertEquals(HttpStatus.OK, response.getStatusCode());
    }

    @Test
    void testCreateCustomerSuccess() {
        CustomerDTO dto = new CustomerDTO();
        dto.setBalance(1000.0);

        when(customerService.createCustomer(any(CustomerDTO.class))).thenReturn(dto);
        ResponseEntity<CustomerDTO> response = customerController.createCustomer(dto);
        assertEquals(HttpStatus.OK, response.getStatusCode());
    }

    @Test
    void testCreateCustomerNullBalanceException() {
        CustomerDTO dto = new CustomerDTO();
        assertThrows(IllegalArgumentException.class, () -> {
            customerController.createCustomer(dto);
        });
    }

    @Test
    void testUpdateCustomer() {
        CustomerDTO dto = new CustomerDTO();
        when(customerService.updateCustomer(eq(1L), any(CustomerDTO.class))).thenReturn(dto);
        ResponseEntity<CustomerDTO> response = customerController.updateCustomer(1L, dto);
        assertEquals(HttpStatus.OK, response.getStatusCode());
    }

    @Test
    void testDeleteCustomer() {
        doNothing().when(customerService).deleteCustomer(1L);
        ResponseEntity<Void> response = customerController.deleteCustomer(1L);
        assertEquals(HttpStatus.NO_CONTENT, response.getStatusCode());
    }
}