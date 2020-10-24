package org.epineuro.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.epineuro.dto.PacienteDTO;
import org.epineuro.mapper.PacienteMapper;
import org.epineuro.model.Paciente;
import org.epineuro.repository.PacienteRepository;
import org.epineuro.request.PacienteRequest;
import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

@Service
public class PacienteService {
	
	@Autowired
	private PacienteRepository repository;
	
	@Autowired
	private PacienteMapper mapper;
	
	public List<PacienteDTO> listar() {
		List<Paciente> pacientes = repository.findAll();
		return pacientes.stream()
					  .map(p -> mapper.modelToDTO(p))
					  .collect(Collectors.toList());
	}
	
	public PacienteDTO buscar(Long id ) {
		
		Optional<Paciente> Paciente = repository.findById(id);
				
		if(Paciente.isPresent()) {
			return mapper.modelToDTO(Paciente.get());
		}
		
		return null;	
	}
	

	@Transactional
	public PacienteDTO salvar(PacienteRequest request) {
		Paciente p = mapper.dtoRequestToModel(request);
		
		return mapper.modelToDTO(repository.save(p));
	}
	
	@Transactional
	public void atualizar(Paciente obj) {
		repository.save(obj);
	}
	
//	@Transactional
//	public void excluir(Long id) {
//		
//		try {
//			repository.deleteById(id);
//			repository.flush();
//		
//		} catch (EmptyResultDataAccessException e) {
//			throw new PacienteNaoEncontradadException(id);
//		};			
//	}
	
}
