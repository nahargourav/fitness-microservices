package com.fitness.aiservice.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
@Slf4j
@Service
public class OpenAiService {
    private final WebClient webClient;

    @Value("${openai.api.key}")
    private String openAiApiKey;

    @Value("${openai.api.url}")
    private String openAiApiUrl;
    public OpenAiService(WebClient.Builder webClientBuilder)
    {
        this.webClient=webClientBuilder.build();

    }
    public String getRecommendations(String details) {

        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("model", "gpt-5.2-chat");
        requestBody.put("input", details);

        log.info("Request body: {}", requestBody);

        Map<String, Object> response = webClient.post()
                .uri(openAiApiUrl) // should be https://api.openai.com/v1/responses
                .header("Authorization", "Bearer " + openAiApiKey)
                .header("Content-Type", "application/json")
                .bodyValue(requestBody)
                .retrieve()
                .bodyToMono(Map.class)
                .block();

        if (response != null && response.containsKey("output")) {
            List<Map<String, Object>> output = (List<Map<String, Object>>) response.get("output");

            for (Map<String, Object> item : output) {
                if ("message".equals(item.get("type"))) {
                    List<Map<String, Object>> content =
                            (List<Map<String, Object>>) item.get("content");

                    for (Map<String, Object> c : content) {
                        if ("output_text".equals(c.get("type"))) {
                            return (String) c.get("text");
                        }
                    }
                }
            }
        }

        return "No recommendations available";
    }

}
