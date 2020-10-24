package org.epineuro.mapper;

import org.epineuro.dto.PacienteDTO;
import org.epineuro.model.Paciente;
import org.epineuro.request.PacienteRequest;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class PacienteMapper {
	
	@Autowired
	private ModelMapper modelMapper;
	
	public PacienteDTO modelToDTO(Paciente Paciente) {
		return modelMapper.map(Paciente, PacienteDTO.class);
	}

	public Paciente dtoRequestToModel(PacienteRequest PacienteRequest) {
		return modelMapper.map(PacienteRequest, Paciente.class);
	}
	
}
