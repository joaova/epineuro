package org.epineuro.security.permissions;

import static java.lang.annotation.ElementType.METHOD;
import static java.lang.annotation.RetentionPolicy.RUNTIME;

import java.lang.annotation.Retention;
import java.lang.annotation.Target;

import org.springframework.security.access.prepost.PreAuthorize;

public @interface CheckSecurity {

	public @interface Cliente {

		// DH01
		@PreAuthorize("isAuthenticated() and " + 
				"hasAuthority('DH01') or hasAuthority('DH03')")
		@Retention(RUNTIME)
		@Target(METHOD)
		public @interface PodeEditar {
		}

		// DH02
		@PreAuthorize("isAuthenticated() and " + 
				"hasAuthority('DH02') and "
				+ "@patinhasSecurity.getUsuarioId() == 6 ")
		@Retention(RUNTIME)
		@Target(METHOD)
		public @interface PodeConsultar {
		}	
	}
	
}