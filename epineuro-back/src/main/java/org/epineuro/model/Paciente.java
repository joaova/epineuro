package org.epineuro.model;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.Id;

import org.epineuro.enums.Sexo;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Data;

@Entity
@Data
public class Paciente implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	private Long id;
	
	private String cid;
	private Integer sexo;
	private String corAutoDeclarada;
	private String paisOrigem;
	private String cidadeNascimento;
	private String cidadeResidencia;
	private String religiao;
	
	@JsonFormat(pattern="dd/MM/yyyy")
	private Date dataNascimento;
	
//	@Setter(AccessLevel.NONE)
//	private Integer idade; //TODO inicializar quando?
	
	public Sexo getSexo() {
		return Sexo.toEnum(sexo);
	}

	public void setSexo(Sexo sexo) {
		this.sexo = sexo.getCod();
	}

}
