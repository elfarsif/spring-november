package com.spring.springappnovember.utility;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.auth0.jwt.interfaces.JWTVerifier;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class JwtUtil {

	 private final static String SECRET = "YourSecretKey"; // Use a strong, unique secret key.
	    private final static Algorithm algorithm = Algorithm.HMAC256(SECRET);

	    // Generate token with a "username" claim
	    public static String generateToken(String username) {
	        long expirationTime = 1000 * 60 * 60; // 1 hour in milliseconds
	        return JWT.create()
	                .withSubject("Authentication") // Use a general subject
	                .withClaim("username", username) // Add "username" as a claim
	                .withExpiresAt(new Date(System.currentTimeMillis() + expirationTime))
	                .sign(algorithm);
	    }

	    // Extract the username from the token
	    public static String getUsernameFromToken(String token) {
	        try {
	            JWTVerifier verifier = JWT.require(algorithm).build(); // Reuse the same algorithm to verify
	            DecodedJWT jwt = verifier.verify(token);
	            return jwt.getClaim("username").asString(); // Extract the username claim
	        } catch (JWTVerificationException exception) {
	            //Invalid signature/claims
	            return null;
	        }
	    }

}

