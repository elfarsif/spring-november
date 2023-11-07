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

    private final static String SECRET = "YourSecretKey";
    private final static Algorithm algorithm = Algorithm.HMAC256(SECRET);

    public static String generateToken(String username) {
    	
        // Token expiration time
        long expirationTime = 1000 * 60 * 60; // 1 hour
        return JWT.create()
                .withSubject(username)
                .withExpiresAt(new Date(System.currentTimeMillis() + expirationTime))
                .sign(algorithm);
    }

}

