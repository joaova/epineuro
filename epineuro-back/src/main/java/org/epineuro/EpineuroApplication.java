package org.epineuro;

import java.util.HashSet;
import java.util.Set;

import org.epineuro.model.Group;
import org.epineuro.model.Permission;
import org.epineuro.model.User;
import org.epineuro.repository.GroupRepository;
import org.epineuro.repository.PermissionRepository;
import org.epineuro.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootApplication
public class EpineuroApplication implements CommandLineRunner {

	public static void main(String[] args) {
		SpringApplication.run(EpineuroApplication.class, args);
	}
	
	@Autowired
	UserRepository userRepository;
	
	@Autowired
	PermissionRepository permissionRepository;
	
	@Autowired
	GroupRepository groupRepository;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@Override
	public void run(String... args) throws Exception {
		
		if(permissionRepository.findAll().size() == 0) {
			
			Permission p1 = new Permission();
			
			p1.setDescription("Permissão de pessoas");
			p1.setId(1L);
			p1.setName("EP01");
			
			
			permissionRepository.save(p1);
			
			Group g1 = new Group();
			
			g1.setNome("Grupo 1 Pessoa");
			g1.setId(1L);
			
			Set<Permission> set1 = new HashSet<Permission>();
			set1.add(p1);

			g1.setPermissions(set1);
			
			groupRepository.save(g1);
			
			User u1 = User.builder()
					.name("João Amaral")
					.email("joaovillanova@hotmail.com.br")
					.password(passwordEncoder.encode("123456"))
					.group(groupRepository.findById(1L).get())
					.type(1L)
					.cod(1L)
			.build();
			
			userRepository.save(u1);
			
		}
		
	}

}
