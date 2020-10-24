package org.epineuro.request;

import java.util.Date;


import lombok.Data;

@Data
public class PacienteRequest {
	

	private Long id;
	private Integer sexo;
	private String corAutoDeclarada;
	private String paisOrigem;
	private String cidadeNascimento;
	private String cidadeResidencia;
	private String religiao;
	private Date dataNascimento;
//	private Integer idade; //TODO inicializar quando?
//	private Integer numeroInternacoes;
	private String cid;
	
}
