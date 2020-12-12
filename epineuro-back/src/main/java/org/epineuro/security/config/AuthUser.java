package org.epineuro.security.config;

import java.util.Collection;

import org.epineuro.model.User;
import org.springframework.security.core.GrantedAuthority;


import lombok.Getter;

@Getter
public class AuthUser extends org.springframework.security.core.userdetails.User {
	private static final long serialVersionUID = 1L;
	
	private Long type;
	private Long cod;
	private String fullName;

	public AuthUser(User user, Collection<? extends GrantedAuthority> permissions) {
		super(user.getEmail(), user.getPassword(), permissions);
		
		this.type = user.getType();
		this.cod = user.getCod();
		this.fullName = user.getName();
	}
}
