package org.example.itqaassitgnment.utils;

import io.restassured.response.Response;

public abstract class RequestFactory {
    public abstract Response createRequest(String endpoint, String requestBody, String username, String password);
}
