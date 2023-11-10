package com.spring.springappnovember.utility;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.util.ArrayList;
import java.util.Collections;


import java.io.IOException;
public class JWTAuthenticationFilter extends OncePerRequestFilter {

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
	        throws ServletException, IOException {

        System.out.println("JWTAuthenticationFilter doFilterInternal method");

	   
	    String jwt = null;
	    String username = null;

	    // Check for token in Authorization header
	    final String authorizationHeader = request.getHeader("Authorization");

	    if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
	        jwt = authorizationHeader.substring(7);
	        username = JwtUtil.getUsernameFromToken(jwt);
	    	System.out.println("in JWTAuthenticationFilter , Check for token in Authorization header"+username);
	    }

	    // If token was not in header, look in cookies
	    if (jwt == null) {  // Debug statement

	    	System.out.println("in JWTAuthenticationFilter , Check Cookies"+username);
	        Cookie[] cookies = request.getCookies();
	    	
	        if (cookies != null) {
	            for (Cookie cookie : cookies) {
	                if ("token".equals(cookie.getName())) {
	                    jwt = cookie.getValue();
	                    username = "hello";
	                    break;
	                }
	            }
	        } else {
	            System.out.println("No cookies found");  // Debug statement
	        }
	    }
	    
	    if (username != null) {  // Debug statement
	        UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(
	                username, null, new ArrayList<>());
	        usernamePasswordAuthenticationToken
	                .setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
	        SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
	    }

	    chain.doFilter(request, response);
	}
}
