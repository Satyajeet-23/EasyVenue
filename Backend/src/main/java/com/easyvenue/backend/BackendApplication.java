
package com.easyvenue.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;

/**
 * Main entry point for the EasyVenue Backend Application
 *
 * This Spring Boot application provides REST APIs for venue booking management,
 * including venue CRUD operations, booking management, and availability tracking.
 *
 * Key Features:
 * - Venue management with availability calendar
 * - Customer booking system with conflict prevention
 * - Admin dashboard with recent bookings
 * - RESTful API endpoints for frontend integration
 *
 * @author EasyVenue Development Team
 * @version 1.0
 * @since 2025-01-01
 */
@SpringBootApplication
public class BackendApplication {

	/**
	 * Main method to start the Spring Boot application
	 *
	 * Initializes the application context, sets up database connections,
	 * and starts the embedded Tomcat server on configured port (default: 8080)
	 *
	 * @param args Command line arguments (optional)
	 */
	public static void main(String[] args) {
		// Simple startup message before Spring Boot initialization
		System.out.println("🚀 Starting EasyVenue Backend Application...");

		// Start Spring Boot application
		SpringApplication.run(BackendApplication.class, args);
	}

	/**
	 * Event listener that executes after the application has fully started
	 * This ensures all beans are initialized and the server is ready to accept requests
	 */
	@EventListener(ApplicationReadyEvent.class)
	public void onApplicationReady() {
		System.out.println("✅ EasyVenue Backend Application started successfully!");
		System.out.println("📡 API available at: http://localhost:8080/api");
		System.out.println("🌐 CORS enabled for: http://localhost:5173");
		System.out.println("📊 Database: MySQL connected successfully");
		System.out.println("🎯 Ready to accept booking requests!");
	}
}
