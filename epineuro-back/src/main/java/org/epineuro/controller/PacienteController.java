package org.epineuro.controller;

import java.net.URI;
import java.util.List;

import javax.validation.Valid;

import org.epineuro.dto.PacienteDTO;
import org.epineuro.model.Paciente;
import org.epineuro.request.PacienteRequest;
import org.epineuro.service.PacienteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
//import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;


@CrossOrigin
@RestController
@RequestMapping("/paciente")
public class PacienteController {

	@Autowired
	private PacienteService service;
	
	@GetMapping
	public List<PacienteDTO> listar() {
		return service.listar();
	}
	
	@PostMapping
	public ResponseEntity<Void> salvar(@RequestBody @Valid PacienteRequest request) {
		PacienteDTO paciente = service.salvar(request);
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest()
				.path("/{id}").buildAndExpand(paciente.getId()).toUri();
		
		return ResponseEntity.created(uri).build();
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<PacienteDTO> buscar(@PathVariable Long id) {
		PacienteDTO Paciente = service.buscar(id);
		
		if (Paciente != null) {
			
			return ResponseEntity.ok().body(Paciente);
		}

		return ResponseEntity.notFound().build();	
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<Void> atualizar(@RequestBody Paciente obj, @PathVariable Long id) {
		
		PacienteDTO PacienteAtual = service.buscar(id);
		
		if (PacienteAtual != null) {

			obj.setId(id);
			service.atualizar(obj);
			
			return ResponseEntity.noContent().build();
		}

		return ResponseEntity.notFound().build();
				
	}
	
//	@DeleteMapping("/{id}")
//	public ResponseEntity<Paciente> excluir(@PathVariable Long id) {
//		
//		service.excluir(id);
//		return ResponseEntity.noContent().build();
//
//	}
	
}
