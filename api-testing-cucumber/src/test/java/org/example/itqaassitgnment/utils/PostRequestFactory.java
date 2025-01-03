package org.example.itqaassitgnment.utils;

import io.restassured.response.Response;

public class PostRequestFactory extends RequestFactory {
    @Override
    public Response createRequest(String endpoint, String requestBody, String username, String password) {
        return APIHelper.getInstance().sendPostRequestWithBasicAuth(endpoint, requestBody, username, password);
    }
}
