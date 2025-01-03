package org.example.itqaassitgnment.utils;

import io.restassured.response.Response;

public class DeleteRequestFactory extends RequestFactory {
    @Override
    public Response createRequest(String endpoint, String requestBody, String username, String password) {
        return APIHelper.getInstance().sendDeleteRequestWithBasicAuth(endpoint, username, password);
    }
}
