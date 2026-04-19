package com.stayverse.service;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.stereotype.Service;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.*;

@Service
public class ChatService {

    private final String apiKey;
    private final HttpClient httpClient;

    public ChatService() {
        Dotenv dotenv = Dotenv.configure().ignoreIfMissing().load();
        this.apiKey = dotenv.get("GEMINI_API_KEY", "");
        this.httpClient = HttpClient.newHttpClient();
    }

    public String generateResponse(List<Map<String, String>> messages, Map<String, Object> context) {
        if (apiKey == null || apiKey.isEmpty()) {
            return getOfflineFallback(messages, context);
        }

        try {
            String userName = (String) context.getOrDefault("userName", "User");
            String destination = (String) context.getOrDefault("destination", "a wonderful destination");
            
            String sysPrompt = "You are an incredibly helpful, friendly, and professional AI travel assistant for an exclusive platform called StayVerse. " +
                               "The user's name is " + userName + ". They are currently looking to travel to " + destination + ". " +
                               "Always output formatting in clean Markdown text. Be concise, polite, luxurious, and offer genuinely good travel advice and recommendations.";

            StringBuilder chatHistory = new StringBuilder(sysPrompt).append("\n\nChat History:\n");
            for (Map<String, String> msg : messages) {
                chatHistory.append(msg.get("role").equals("user") ? "User: " : "Assistant: ").append(msg.get("content")).append("\n");
            }
            chatHistory.append("Assistant:");

            String jsonPayload = "{ \"contents\": [{ \"parts\": [{ \"text\": \"" + escapeJson(chatHistory.toString()) + "\" }] }] }";

            HttpRequest request = HttpRequest.newBuilder()
                    .uri(new URI("https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" + apiKey))
                    .header("Content-Type", "application/json")
                    .POST(HttpRequest.BodyPublishers.ofString(jsonPayload))
                    .build();

            HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());
            
            // Note: Simple JSON parsing for demonstration. In production, use Jackson or Gson.
            if (response.statusCode() == 200) {
                String body = response.body();
                int start = body.indexOf("\"text\": \"") + 9;
                int end = body.indexOf("\"", start);
                if (start > 8 && end > start) {
                    return body.substring(start, end).replace("\\n", "\n").replace("\\\"", "\"");
                }
            }
            return "I'm having trouble connecting to my AI core right now. " + getOfflineFallback(messages, context);
        } catch (Exception e) {
            e.printStackTrace();
            return getOfflineFallback(messages, context);
        }
    }

    private String getOfflineFallback(List<Map<String, String>> messages, Map<String, Object> context) {
        String userMsg = messages.get(messages.size() - 1).get("content").toLowerCase();
        String userName = (String) context.getOrDefault("userName", "there");

        if (userMsg.contains("hello") || userMsg.contains("hi")) {
            return "Hi " + userName + "! I am the StayVerse Offline Travel Assistant. How can I assist you with your bookings today?";
        } else if (userMsg.contains("suggest") || userMsg.contains("recommend")) {
            return "I highly recommend checking out globally trending destinations like **Paris**, **Tokyo**, or **Dubai**! Just head over to the **Explore** tab to see what's available.";
        } else if (userMsg.contains("cancel")) {
            return "To cancel an active booking, please visit the 'My Trips' section. Cancellations are processed immediately.";
        }
        
        return "That sounds like a fascinating journey! While I am currently operating without a live connection, I suggest checking our Explore tab to map out some initial dates.";
    }

    private String escapeJson(String text) {
        return text.replace("\\", "\\\\")
                   .replace("\"", "\\\"")
                   .replace("\n", "\\n")
                   .replace("\r", "\\r")
                   .replace("\t", "\\t");
    }
}
