drop database if exists TesisEye;
create database TesisEye;
use TesisEye;
create table Users(
	id INT NOT NULL AUTO_INCREMENT,
	email VARCHAR(100),
	name VARCHAR(75) not null,
	password VARCHAR(250) not null,
	recovery_token TEXT,
	rol VARCHAR(100) not null default 'ESTUDIANTE',
	primary key (id, email)
);

create table parallel(
	id INT NOT NULL AUTO_INCREMENT,
	primary key (id),
	name VARCHAR(100) not null,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

create table parallel_user(
	id INT NOT NULL AUTO_INCREMENT,
	primary key (id),
	id_parallel INT not null,
	id_user INT not null,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	foreign key (id_parallel) references parallel(id),
	foreign key (id_user) references Users(id)
);

create table technique (
	id_technique MEDIUMINT NOT NULL AUTO_INCREMENT,
	primary key (id_technique),
	name VARCHAR(100) not null,
	short_description VARCHAR(100) not null,
	description TEXT,
	magnification VARCHAR(100) not null,
	lightingAngle VARCHAR(100) not null,
	imageNormal VARCHAR(100) not null,
	imageTechnique VARCHAR(100) not null,
	assess TEXT
);

CREATE TABLE Images (
  id_image VARCHAR(100) PRIMARY KEY,
  url VARCHAR(255) NOT NULL,
  name VARCHAR(100) NOT NULL,
  details TEXT,
  state VARCHAR(255),
  externalId VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

create table Comments(
	id_comment MEDIUMINT NOT NULL AUTO_INCREMENT,
	primary key (id_comment),
	id_image VARCHAR(100) not null,
	id_user INT not null,
	comment TEXT not null,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	foreign key (id_image) references Images(id_image),
	foreign key (id_user) references Users(id)
);

create table disaeses(
	id_disease MEDIUMINT NOT NULL AUTO_INCREMENT,
	primary key (id_disease),
	name VARCHAR(100) not null
);

create table symptom (
	id_symptom MEDIUMINT NOT NULL AUTO_INCREMENT,
	primary key (id_symptom),
	name VARCHAR(100) not null
);

create table advanced_symptoms (
	id_advanced_symptoms MEDIUMINT NOT NULL AUTO_INCREMENT,
	primary key (id_advanced_symptoms),
	name VARCHAR(100) not null
);

create table early_symptoms (
	id_early_symptoms MEDIUMINT NOT NULL AUTO_INCREMENT,
	primary key (id_early_symptoms),
	name VARCHAR(100) not null
);

create table treatment (
	id_treatment MEDIUMINT NOT NULL AUTO_INCREMENT,
	primary key (id_treatment),
	name VARCHAR(100) not null
);

create table diagnosis (
	id_diagnosis MEDIUMINT NOT NULL AUTO_INCREMENT,
	primary key (id_diagnosis),
	name VARCHAR(100) not null
);

create table disaeses_symptom (
	id_disease MEDIUMINT not null,
	id_symptom MEDIUMINT not null,
	primary key (id_disease, id_symptom),
	foreign key (id_disease) references disaeses(id_disease),
	foreign key (id_symptom) references symptom(id_symptom)
);

create table disaeses_advanced_symptoms (
	id_disease MEDIUMINT not null,
	id_advanced_symptoms MEDIUMINT not null,
	primary key (id_disease, id_advanced_symptoms),
	foreign key (id_disease) references disaeses(id_disease),
	foreign key (id_advanced_symptoms) references advanced_symptoms(id_advanced_symptoms)
);

create table disaeses_early_symptoms (
	id_disease MEDIUMINT not null,
	id_early_symptoms MEDIUMINT not null,
	primary key (id_disease, id_early_symptoms),
	foreign key (id_disease) references disaeses(id_disease),
	foreign key (id_early_symptoms) references early_symptoms(id_early_symptoms)
);

create table disaeses_treatment (
	id_disease MEDIUMINT not null,
	id_treatment MEDIUMINT not null,
	primary key (id_disease, id_treatment),
	foreign key (id_disease) references disaeses(id_disease),
	foreign key (id_treatment) references treatment(id_treatment)
);

create table disaeses_diagnosis (
	id_disease MEDIUMINT not null,
	id_diagnosis MEDIUMINT not null,
	primary key (id_disease, id_diagnosis),
	foreign key (id_disease) references disaeses(id_disease),
	foreign key (id_diagnosis) references diagnosis(id_diagnosis)
);

insert into Users (id,email, name, password, rol) values (1,'docente1@localhost.com','Profesor 1', '$2b$10$dQWadZkcGMs9A1XQgL1.kOUs22pRo5co3VxjtlE34H62N.JfpfHPy', 'DOCENTE');
insert into Users (id,email, name, password, rol) values (2,'docente2@localhost.com','Profesor 2', '$2b$10$dQWadZkcGMs9A1XQgL1.kOUs22pRo5co3VxjtlE34H62N.JfpfHPy', 'DOCENTE');
insert into Users (id,email, name, password, rol) values (3,'docente3@localhost.com','Profesor 3', '$2b$10$dQWadZkcGMs9A1XQgL1.kOUs22pRo5co3VxjtlE34H62N.JfpfHPy', 'DOCENTE');
insert into Users (id,email, name, password) values (4,'student1@localhost.com','Estudiante 1', '$2b$10$dQWadZkcGMs9A1XQgL1.kOUs22pRo5co3VxjtlE34H62N.JfpfHPy');
insert into Users (id,email, name, password) values (5,'student2@localhost.com','Estudiante 2', '$2b$10$dQWadZkcGMs9A1XQgL1.kOUs22pRo5co3VxjtlE34H62N.JfpfHPy');
insert into Users (id,email, name, password) values (6,'student3@localhost.com','Estudiante 3', '$2b$10$dQWadZkcGMs9A1XQgL1.kOUs22pRo5co3VxjtlE34H62N.JfpfHPy');
insert into Users (id,email, name, password) values (7,'student4@localhost.com','Estudiante 4', '$2b$10$dQWadZkcGMs9A1XQgL1.kOUs22pRo5co3VxjtlE34H62N.JfpfHPy');
insert into Users (id,email, name, password) values (8,'student5@localhost.com','Estudiante 5', '$2b$10$dQWadZkcGMs9A1XQgL1.kOUs22pRo5co3VxjtlE34H62N.JfpfHPy');
insert into Users (id,email, name, password) values (9,'student6@localhost.com','Estudiante 6', '$2b$10$dQWadZkcGMs9A1XQgL1.kOUs22pRo5co3VxjtlE34H62N.JfpfHPy');

insert into parallel (id,name) values (1,'Paralelo A');
insert into parallel (id,name) values (2,'Paralelo B');
insert into parallel (id,name) values (3,'Paralelo C');

insert into parallel_user (id_parallel, id_user) values (1, 1);
insert into parallel_user (id_parallel, id_user) values (2,2);
insert into parallel_user (id_parallel, id_user) values (3,3);

insert into disaeses (name) values ('Afecciones de la córnea');
insert into disaeses (name) values ('Agujero macular');
insert into disaeses (name) values ('Ambliopía (Ojo perezoso u ojo vago)');
insert into disaeses (name) values ('Anoftalmia y microftalmia');
insert into disaeses (name) values ('Astigmatismo');
insert into disaeses (name) values ('Baja visión');
insert into disaeses (name) values ('Blefaritis');
insert into disaeses (name) values ('Blefaroespasmo');
insert into disaeses (name) values ('Catarata');
insert into disaeses (name) values ('Coloboma');
insert into disaeses (name) values ('Conjuntivitis aguda');
insert into disaeses (name) values ('Daltonismo');
insert into disaeses (name) values ('Degeneración macular relacionada con la edad');
insert into disaeses (name) values ('Desprendimiento de retina');
insert into disaeses (name) values ('Desprendimiento vitreo');
insert into disaeses (name) values ('Discapacidad visual cerebral');
insert into disaeses (name) values ('Distrofia cristalina de Bietti');
insert into disaeses (name) values ('Enfermedad de behcet');
insert into disaeses (name) values ('Enfermedad de Stargardt');
insert into disaeses (name) values ('Enfermedad ocular de Graves');
insert into disaeses (name) values ('Errores de refracción');
insert into disaeses (name) values ('Glaucoma');
insert into disaeses (name) values ('Hipermetropía');
insert into disaeses (name) values ('Hipertenión intracraneal idiopática');
insert into disaeses (name) values ('Insuficiencia de convergencia');
insert into disaeses (name) values ('Miodesopsias ("Moscas volantes")');
insert into disaeses (name) values ('Miopía');
insert into disaeses (name) values ('Oclusión de la vena central de la retina (CRVO)');
insert into disaeses (name) values ('Pliegue macular');
insert into disaeses (name) values ('Presbicia');
insert into disaeses (name) values ('Retinitis pigmentaria');
insert into disaeses (name) values ('Retinoblastoma');
insert into disaeses (name) values ('Retinopatia de la prematuridad');
insert into disaeses (name) values ('Retinopatia diabética');
insert into disaeses (name) values ('Sindrome de histoplasmosis ocular');
insert into disaeses (name) values ('Sindrome de Usher');
insert into disaeses (name) values ('Sindrome del ojo seco');
insert into disaeses (name) values ('Uveítis');


 insert into symptom (name) values ('dolor ocular');
 insert into symptom (name) values ('visión borrosa');
 insert into symptom (name) values ('ojos rojos o llorosos');
 insert into symptom (name) values ('sensibilidad a la luz');
 insert into symptom (name) values ('baja visión en un ojo');
 insert into symptom (name) values ('dolor de cabeza');
 insert into symptom (name) values ('fatiga ocular');
 insert into symptom (name) values ('problemas de visión en la noche');
 insert into symptom (name) values ('ojos o párpados enrojecidos');
 insert into symptom (name) values ('con picazón');
 insert into symptom (name) values ('ardor');
 insert into symptom (name) values ('párpados o pestañas con costras');
 insert into symptom (name) values ('contracción de los músculos del párpado que usted no puede controlar');
 insert into symptom (name) values ('nacer sin parte del ojo');
 insert into symptom (name) values ('pérdida de visión');
 insert into symptom (name) values ('ojos rosados o rojos');
 insert into symptom (name) values ('picazón o ardor en los ojos');
 insert into symptom (name) values ('ojos llorosos');
 insert into symptom (name) values ('líquido inusual que sale de los ojos');
 insert into symptom (name) values ('problemas para ver la diferencia entre los colores');
 insert into symptom (name) values ('pequeñas manchas oscuras o líneas onduladas que flotan a través de su visión');
 insert into symptom (name) values ('destellos de luz en un ojo o en ambos');
 insert into symptom (name) values ('una “cortina” o sombra sobre su campo visual');
 insert into symptom (name) values ('moscas volantes');
 insert into symptom (name) values ('destellos de luz en la visión lateral');
 insert into symptom (name) values ('baja visión');
 insert into symptom (name) values ('problemas al ver cosas como caras u objetos en movimiento');
 insert into symptom (name) values ('especialmente la visión nocturna y la visión periférica (lateral)');
 insert into symptom (name) values ('pérdida de la visión central');
 insert into symptom (name) values ('ojos sobresalientes');
 insert into symptom (name) values ('ojos secos');
 insert into symptom (name) values ('visión doble');
 insert into symptom (name) values ('párpados hinchados');
 insert into symptom (name) values ('párpados que se retraen más de lo normal');
 insert into symptom (name) values ('pérdida de la visión lateral (periférica)');
 insert into symptom (name) values ('áreas sin visión');
 insert into symptom (name) values ('ceguera');
 insert into symptom (name) values ('dificultad para ver las cosas de cerca');
 insert into symptom (name) values ('fatiga visual');
 insert into symptom (name) values ('puntos ciegos en la visión');
 insert into symptom (name) values ('pérdida de la visión periférica (lateral)');
 insert into symptom (name) values ('visión borrosa o doble al mirar las cosas de cerca');
 insert into symptom (name) values ('manchas oscuras pequeñas o filamentos irregulares que flotan a través de su campo visual');
 insert into symptom (name) values ('problemas para ver cosas que están lejos');
 insert into symptom (name) values ('necesidad de entrecerrar los ojos para ver claramente');
 insert into symptom (name) values ('pérdida repentina de la visión');
 insert into symptom (name) values ('visión borrosa u ondulada');
 insert into symptom (name) values ('problemas para ver cosas de cerca');
 insert into symptom (name) values ('pupilas que se ven blancas bajo una luz brillante o con fotos con flash');
 insert into symptom (name) values ('ojos cruzados');
 insert into symptom (name) values ('hinchazón de los ojos');
 insert into symptom (name) values ('dolor en los ojos');
 insert into symptom (name) values ('movimientos inusuales de los ojos');
 insert into symptom (name) values ('pupilas blancas');
 insert into symptom (name) values ('visión con manchas flotantes');
 insert into symptom (name) values ('puntos ciego');
 insert into symptom (name) values ('pérdida de la visión nocturna y de la visión lateral (periférica)');
 insert into symptom (name) values ('sensación de ardor');
 insert into symptom (name) values ('resequedad o picazón');
 insert into symptom (name) values ('ojos rojos');
 insert into symptom (name) values ('nacer sin uno o ambos ojos (anoftalmia) o con ojos inusualmente pequeños (microftalmia)');
 insert into symptom (name) values ('no ver lo suficientemente bien para hacer tareas cotidianas como leer y conducir un auto');
 insert into symptom (name) values ('llagas en la boca');
 insert into symptom (name) values ('llagas en los genitales');
 insert into symptom (name) values ('problemas de la piel');


insert into diagnosis (name) values ('examen de ojos');
insert into diagnosis (name) values ('tomografía de coherencia óptica');
insert into diagnosis (name) values ('examen ocular');
insert into diagnosis (name) values ('pruebas prenatales');
insert into diagnosis (name) values ('examen físico');
insert into diagnosis (name) values ('examen de ojos con dilatación de las pupilas');
insert into diagnosis (name) values ('examen de dilatación de las pupilas');
insert into diagnosis (name) values ('examen de los ojos');
insert into diagnosis (name) values ('exámenes de laboratorio');
insert into diagnosis (name) values ('pruebas para evaluar la visión de los colores');
insert into diagnosis (name) values ('historial médico');
insert into diagnosis (name) values ('escáner cerebral');
insert into diagnosis (name) values ('otros exámenes como la capacidad de realizar actividades diarias');
insert into diagnosis (name) values ('pruebas genéticas');
insert into diagnosis (name) values ('fotografías o escáneres de la retina');
insert into diagnosis (name) values ('pruebas de visión periférica');
insert into diagnosis (name) values ('examen de la visión');
insert into diagnosis (name) values ('otras pruebas médicas');
insert into diagnosis (name) values ('pruebas de diagnóstico a través de imágenes');
insert into diagnosis (name) values ('electrorretinografía (un tipo de prueba de la retina)');
insert into diagnosis (name) values ('prueba genética');
insert into diagnosis (name) values ('ecografía ocular');
insert into diagnosis (name) values ('angiografía con fluoresceína');
insert into diagnosis (name) values ('prueba de audición');
insert into diagnosis (name) values ('prueba de equilibrio');
insert into diagnosis (name) values ('midiendo la cantidad y la viscosidad de las lágrimas');

insert into treatment (name) values ('medicamentos');
insert into treatment (name) values ('cirugía láser');
insert into treatment (name) values ('trasplante de córnea');
insert into treatment (name) values ('córnea artificial');
insert into treatment (name) values ('supervisión cercana de los agujeros pequeños existentes');
insert into treatment (name) values ('cirugía para la mayoría de los casos');
insert into treatment (name) values ('gotas para los ojos o el uso de un parche ocular');
insert into treatment (name) values ('dispositivos prostéticos');
insert into treatment (name) values ('cirugía');
insert into treatment (name) values ('anteojos con receta médica');
insert into treatment (name) values ('lentes de contacto');
insert into treatment (name) values ('dispositivos de ayuda para poder ver mejor');
insert into treatment (name) values ('rehabilitación visual');
insert into treatment (name) values ('mantener los párpados limpios y sin costras');
insert into treatment (name) values ('compresas tibias');
insert into treatment (name) values ('antibióticos o gotas para los ojos con esteroides');
insert into treatment (name) values ('inyecciones');
insert into treatment (name) values ('anteojos');
insert into treatment (name) values ('dispositivos de ayuda visual');
insert into treatment (name) values ('intervención temprana');
insert into treatment (name) values ('anteojos especiales');
insert into treatment (name) values ('dispositivos de apoyo visual');
insert into treatment (name) values ('suplementos dietéticos');
insert into treatment (name) values ('terapia fotodinámica');
insert into treatment (name) values ('tratamiento láser');
insert into treatment (name) values ('apoyo educacional');
insert into treatment (name) values ('ninguno');
insert into treatment (name) values ('medicamento (esteroides)');
insert into treatment (name) values ('ayudas visuales');
insert into treatment (name) values ('rehabilitación de la visión');
insert into treatment (name) values ('gotas para los ojos');
insert into treatment (name) values ('medicamentos (generalmente gotas para los ojos)');
insert into treatment (name) values ('tratamiento con láser');
insert into treatment (name) values ('pérdida de peso');
insert into treatment (name) values ('terapia visual');
insert into treatment (name) values ('medicamentos (inyecciones)');
insert into treatment (name) values ('ninguno para casos leves');
insert into treatment (name) values ('cirugía para casos graves');
insert into treatment (name) values ('ayudas para la baja visión');
insert into treatment (name) values ('quimioterapia');
insert into treatment (name) values ('radiación');
insert into treatment (name) values ('crioterapia (tratamiento de congelación)');
insert into treatment (name) values ('cirugía para extirpar el ojo (enucleación)');
insert into treatment (name) values ('observación (para casos leves)');
insert into treatment (name) values ('inyecciones oculares');
insert into treatment (name) values ('dispositivos de ayuda para la visión');
insert into treatment (name) values ('rehabilitación de la vista');
insert into treatment (name) values ('dispositivos de ayuda para la audición');
insert into treatment (name) values ('implantes cocleares');
insert into treatment (name) values ('medicamentos (píldoras o gotas para los ojos)');
insert into treatment (name) values ('cambios en el estilo de vida');
insert into treatment (name) values ('medicamentos (generalmente gotas para los ojos, pastillas o inyecciones)');
insert into treatment (name) values ('ninguno (en la mayoría de los casos)');

insert into advanced_symptoms (name) values ('pérdida de la visión central que necesita para ver los detalles de frente');
insert into advanced_symptoms (name) values ('áreas borrosas u onduladas en su visión central');
insert into advanced_symptoms (name) values ('visión borrosa');
insert into advanced_symptoms (name) values ('los colores se ven opacos');
insert into advanced_symptoms (name) values ('sensibilidad a la luz');
insert into advanced_symptoms (name) values ('problemas de visión en la noche');
insert into advanced_symptoms (name) values ('visión doble');
insert into advanced_symptoms (name) values ('pérdida de la visión central');

insert into early_symptoms (name) values ('visión borrosa u ondulada');
insert into early_symptoms (name) values ('ninguno');

insert into disaeses_early_symptoms values (2, 1);
insert into disaeses_early_symptoms values (13, 2);
insert into disaeses_early_symptoms values (9, 2);

insert into disaeses_advanced_symptoms values (2, 8);
insert into disaeses_advanced_symptoms values (9, 3);
insert into disaeses_advanced_symptoms values (9, 4);
insert into disaeses_advanced_symptoms values (9, 5);
insert into disaeses_advanced_symptoms values (9, 6);
insert into disaeses_advanced_symptoms values (9, 7);
insert into disaeses_advanced_symptoms values (13, 1);
insert into disaeses_advanced_symptoms values (13, 2);

insert into disaeses_symptom values (1, 1); 
insert into disaeses_symptom values (1, 2); 
insert into disaeses_symptom values (1, 3); 
insert into disaeses_symptom values (1, 4); 
insert into disaeses_symptom values (3, 5);
insert into disaeses_symptom values (4, 61);
insert into disaeses_symptom values (5, 6);
insert into disaeses_symptom values (5, 2);
insert into disaeses_symptom values (5, 7);
insert into disaeses_symptom values (5, 8);
insert into disaeses_symptom values (6, 2);
insert into disaeses_symptom values (6, 62);
insert into disaeses_symptom values (7, 9);
insert into disaeses_symptom values (7, 10);
insert into disaeses_symptom values (7, 11);
insert into disaeses_symptom values (7, 12);
insert into disaeses_symptom values (8, 13);
insert into disaeses_symptom values (10, 14);
insert into disaeses_symptom values (10, 15);
insert into disaeses_symptom values (10, 4);
insert into disaeses_symptom values (11, 16);
insert into disaeses_symptom values (11, 17);
insert into disaeses_symptom values (11, 18);
insert into disaeses_symptom values (11, 19);
insert into disaeses_symptom values (12, 20);
insert into disaeses_symptom values (14, 21);
insert into disaeses_symptom values (14, 22);
insert into disaeses_symptom values (14, 23);
insert into disaeses_symptom values (15, 24);
insert into disaeses_symptom values (15, 25);
insert into disaeses_symptom values (16, 26);
insert into disaeses_symptom values (16, 27);
insert into disaeses_symptom values (17, 15);
insert into disaeses_symptom values (17, 28);
insert into disaeses_symptom values (18, 2);
insert into disaeses_symptom values (18, 1);
insert into disaeses_symptom values (18, 60);
insert into disaeses_symptom values (18, 63);
insert into disaeses_symptom values (18, 64);
insert into disaeses_symptom values (18, 65);
insert into disaeses_symptom values (19, 29);
insert into disaeses_symptom values (19, 4);
insert into disaeses_symptom values (20, 30);
insert into disaeses_symptom values (20, 31);
insert into disaeses_symptom values (20, 32);
insert into disaeses_symptom values (20, 33);
insert into disaeses_symptom values (20, 34);
insert into disaeses_symptom values (21, 2);
insert into disaeses_symptom values (22, 35);
insert into disaeses_symptom values (22, 36);
insert into disaeses_symptom values (22, 37);
insert into disaeses_symptom values (23, 38);
insert into disaeses_symptom values (23, 39);
insert into disaeses_symptom values (24, 6);
insert into disaeses_symptom values (24, 40);
insert into disaeses_symptom values (24, 41);
insert into disaeses_symptom values (25, 42);
insert into disaeses_symptom values (26, 43);
insert into disaeses_symptom values (27, 44);
insert into disaeses_symptom values (27, 45);
insert into disaeses_symptom values (27, 7);
insert into disaeses_symptom values (28, 2);
insert into disaeses_symptom values (28, 46);
insert into disaeses_symptom values (29, 47);
insert into disaeses_symptom values (30, 48);
insert into disaeses_symptom values (30, 7);
insert into disaeses_symptom values (31, 57);
insert into disaeses_symptom values (32, 49);
insert into disaeses_symptom values (32, 50);
insert into disaeses_symptom values (32, 51);
insert into disaeses_symptom values (32, 52);
insert into disaeses_symptom values (32, 18);
insert into disaeses_symptom values (33, 53);
insert into disaeses_symptom values (33, 54);
insert into disaeses_symptom values (33, 15);
insert into disaeses_symptom values (34, 2);
insert into disaeses_symptom values (34, 55);
insert into disaeses_symptom values (34, 37);
insert into disaeses_symptom values (35, 2);
insert into disaeses_symptom values (35, 56);
insert into disaeses_symptom values (36, 57);
insert into disaeses_symptom values (37, 58);
insert into disaeses_symptom values (37, 59);
insert into disaeses_symptom values (37, 2);
insert into disaeses_symptom values (37, 60);
insert into disaeses_symptom values (38, 2);
insert into disaeses_symptom values (38, 24);
insert into disaeses_symptom values (38, 1);
insert into disaeses_symptom values (38, 60);
insert into disaeses_symptom values (38, 4);

insert into disaeses_treatment values (1, 1);
insert into disaeses_treatment values (1, 2);
insert into disaeses_treatment values (1, 3);
insert into disaeses_treatment values (1, 4);
insert into disaeses_treatment values (2, 5);
insert into disaeses_treatment values (2, 6);
insert into disaeses_treatment values (3, 7);
insert into disaeses_treatment values (4, 8);
insert into disaeses_treatment values (4, 9);
insert into disaeses_treatment values (4, 1);
insert into disaeses_treatment values (5, 10);
insert into disaeses_treatment values (5, 11);
insert into disaeses_treatment values (5, 9);
insert into disaeses_treatment values (6, 12);
insert into disaeses_treatment values (6, 13);
insert into disaeses_treatment values (7, 14);
insert into disaeses_treatment values (7, 15);
insert into disaeses_treatment values (7, 16);
insert into disaeses_treatment values (8, 17);
insert into disaeses_treatment values (8, 9);
insert into disaeses_treatment values (9, 9);
insert into disaeses_treatment values (10, 18);
insert into disaeses_treatment values (10, 11);
insert into disaeses_treatment values (10, 19);
insert into disaeses_treatment values (10, 20);
insert into disaeses_treatment values (10, 9);
insert into disaeses_treatment values (11, 1);
insert into disaeses_treatment values (12, 21);
insert into disaeses_treatment values (12, 22);
insert into disaeses_treatment values (13, 23);
insert into disaeses_treatment values (13, 17);
insert into disaeses_treatment values (13, 24);
insert into disaeses_treatment values (14, 25);
insert into disaeses_treatment values (14, 9);
insert into disaeses_treatment values (15, 9);
insert into disaeses_treatment values (16, 13);
insert into disaeses_treatment values (16, 26);
insert into disaeses_treatment values (17, 27);
insert into disaeses_treatment values (18, 28);
insert into disaeses_treatment values (19, 29);
insert into disaeses_treatment values (19, 30);
insert into disaeses_treatment values (20, 31);
insert into disaeses_treatment values (20, 1);
insert into disaeses_treatment values (20, 9);
insert into disaeses_treatment values (21, 18);
insert into disaeses_treatment values (21, 11);
insert into disaeses_treatment values (21, 9);
insert into disaeses_treatment values (22, 32);
insert into disaeses_treatment values (22, 25);
insert into disaeses_treatment values (22, 9);
insert into disaeses_treatment values (23, 18);
insert into disaeses_treatment values (23, 11);
insert into disaeses_treatment values (23, 9);
insert into disaeses_treatment values (24, 34);
insert into disaeses_treatment values (24, 1);
insert into disaeses_treatment values (24, 9);
insert into disaeses_treatment values (25, 35);
insert into disaeses_treatment values (26, 53);
insert into disaeses_treatment values (26, 9);
insert into disaeses_treatment values (27, 18);
insert into disaeses_treatment values (27, 11);
insert into disaeses_treatment values (27, 9);
insert into disaeses_treatment values (28, 36);
insert into disaeses_treatment values (28, 2);
insert into disaeses_treatment values (29, 37);
insert into disaeses_treatment values (29, 38);
insert into disaeses_treatment values (30, 10);
insert into disaeses_treatment values (30, 11);
insert into disaeses_treatment values (31, 39);
insert into disaeses_treatment values (31, 30);
insert into disaeses_treatment values (32, 40);
insert into disaeses_treatment values (32, 25);
insert into disaeses_treatment values (32, 41);
insert into disaeses_treatment values (32, 42);
insert into disaeses_treatment values (32, 43);
insert into disaeses_treatment values (33, 44);
insert into disaeses_treatment values (33, 25);
insert into disaeses_treatment values (33, 45);
insert into disaeses_treatment values (33, 9);
insert into disaeses_treatment values (34, 17);
insert into disaeses_treatment values (34, 25);
insert into disaeses_treatment values (34, 9);
insert into disaeses_treatment values (35, 17);
insert into disaeses_treatment values (35, 2);
insert into disaeses_treatment values (36, 46);
insert into disaeses_treatment values (36, 47);
insert into disaeses_treatment values (36, 48);
insert into disaeses_treatment values (36, 49);
insert into disaeses_treatment values (37, 50);
insert into disaeses_treatment values (37, 51);
insert into disaeses_treatment values (38, 52);

insert into disaeses_diagnosis values (1, 1);
insert into disaeses_diagnosis values (2, 6);
insert into disaeses_diagnosis values (2, 2);
insert into disaeses_diagnosis values (3, 3);
insert into disaeses_diagnosis values (4, 4);
insert into disaeses_diagnosis values (4, 5);
insert into disaeses_diagnosis values (5, 6);
insert into disaeses_diagnosis values (6, 7);
insert into disaeses_diagnosis values (7, 1);
insert into disaeses_diagnosis values (8, 1);
insert into disaeses_diagnosis values (9, 6);
insert into disaeses_diagnosis values (10, 1);
insert into disaeses_diagnosis values (11, 1);
insert into disaeses_diagnosis values (11, 9);
insert into disaeses_diagnosis values (12, 10);
insert into disaeses_diagnosis values (13, 6);
insert into disaeses_diagnosis values (14, 7);
insert into disaeses_diagnosis values (15, 7);
insert into disaeses_diagnosis values (16, 11);
insert into disaeses_diagnosis values (16, 1);
insert into disaeses_diagnosis values (16, 12);
insert into disaeses_diagnosis values (16, 13);
insert into disaeses_diagnosis values (17, 6);
insert into disaeses_diagnosis values (17, 14);
insert into disaeses_diagnosis values (18, 11);
insert into disaeses_diagnosis values (19, 6);
insert into disaeses_diagnosis values (19, 15);
insert into disaeses_diagnosis values (19, 21);
insert into disaeses_diagnosis values (20, 1);
insert into disaeses_diagnosis values (21, 1);
insert into disaeses_diagnosis values (22, 6);
insert into disaeses_diagnosis values (22, 16);
insert into disaeses_diagnosis values (23, 1);
insert into disaeses_diagnosis values (24, 6);
insert into disaeses_diagnosis values (24, 17);
insert into disaeses_diagnosis values (24, 18);
insert into disaeses_diagnosis values (25, 1);
insert into disaeses_diagnosis values (26, 7);
insert into disaeses_diagnosis values (27, 1);
insert into disaeses_diagnosis values (28, 6);
insert into disaeses_diagnosis values (28, 19);
insert into disaeses_diagnosis values (29, 7);
insert into disaeses_diagnosis values (30, 1);
insert into disaeses_diagnosis values (31, 6);
insert into disaeses_diagnosis values (31, 20);
insert into disaeses_diagnosis values (31, 14);
insert into disaeses_diagnosis values (32, 6);
insert into disaeses_diagnosis values (32, 22);
insert into disaeses_diagnosis values (33, 6);
insert into disaeses_diagnosis values (34, 6);
insert into disaeses_diagnosis values (35, 6);
insert into disaeses_diagnosis values (35, 23);
insert into disaeses_diagnosis values (36, 6);
insert into disaeses_diagnosis values (36, 24);
insert into disaeses_diagnosis values (36, 25);
insert into disaeses_diagnosis values (36, 21);
insert into disaeses_diagnosis values (37, 1);
insert into disaeses_diagnosis values (37, 26);
insert into disaeses_diagnosis values (38, 6);
insert into disaeses_diagnosis values (38, 11);

insert into images(id_image, url, name, externalId) values ('1q-x6LQKvrMR_w-2g9rrFOhwHXRnsxJdc', 'https://drive.google.com/uc?id=1q-x6LQKvrMR_w-2g9rrFOhwHXRnsxJdc&export=view', '1q-x6LQKvrMR_w-2g9rrFOhwHXRnsxJdc', 'disaeses_1');
insert into images(id_image, url, name, externalId) values ('12F82FCX87Yct3djvBHQjaKnrzAXtmJ-f', 'https://drive.google.com/uc?id=12F82FCX87Yct3djvBHQjaKnrzAXtmJ-f&export=view', '12F82FCX87Yct3djvBHQjaKnrzAXtmJ-f', 'disaeses_2');
insert into images(id_image, url, name, externalId) values ('1NG5cD6XCz4_seTA_R9BwR2Us3vMBOalX', 'https://drive.google.com/uc?id=1NG5cD6XCz4_seTA_R9BwR2Us3vMBOalX&export=view', '1NG5cD6XCz4_seTA_R9BwR2Us3vMBOalX', 'disaeses_3');
insert into images(id_image, url, name, externalId) values ('191FOGjF7H_ZM37TNZU5LatpneuXyzYIi', 'https://drive.google.com/uc?id=191FOGjF7H_ZM37TNZU5LatpneuXyzYIi&export=view', '191FOGjF7H_ZM37TNZU5LatpneuXyzYIi', 'disaeses_4');
insert into images(id_image, url, name, externalId) values ('1xpLUlGbLxQdI4kwb_si29jlMbAxGet8o', 'https://drive.google.com/uc?id=1xpLUlGbLxQdI4kwb_si29jlMbAxGet8o&export=view', '1xpLUlGbLxQdI4kwb_si29jlMbAxGet8o', 'disaeses_5');
insert into images(id_image, url, name, externalId) values ('1LExMxiwYtBMSIvRYuoHtZa3v92WzcwN_', 'https://drive.google.com/uc?id=1LExMxiwYtBMSIvRYuoHtZa3v92WzcwN_&export=view', '1LExMxiwYtBMSIvRYuoHtZa3v92WzcwN_', 'disaeses_6');
insert into images(id_image, url, name, externalId) values ('1AErZ4EWSDvmeSGHel73380OP24UfYw7T', 'https://drive.google.com/uc?id=1AErZ4EWSDvmeSGHel73380OP24UfYw7T&export=view', '1AErZ4EWSDvmeSGHel73380OP24UfYw7T', 'disaeses_7');
insert into images(id_image, url, name, externalId) values ('18Aq_X-KiOh3_GfmQqktqv0cMxqQ-CDfP', 'https://drive.google.com/uc?id=18Aq_X-KiOh3_GfmQqktqv0cMxqQ-CDfP&export=view', '18Aq_X-KiOh3_GfmQqktqv0cMxqQ-CDfP', 'disaeses_8');
insert into images(id_image, url, name, externalId) values ('1yAMilWFPnqgoRiBK6l4EyXHG8YCBDhnk', 'https://drive.google.com/uc?id=1yAMilWFPnqgoRiBK6l4EyXHG8YCBDhnk&export=view', '1yAMilWFPnqgoRiBK6l4EyXHG8YCBDhnk', 'disaeses_9');
insert into images(id_image, url, name, externalId) values ('1kkkal0958S0OBtCbD9M8VgWEN7DMuqY6', 'https://drive.google.com/uc?id=1kkkal0958S0OBtCbD9M8VgWEN7DMuqY6&export=view', '1kkkal0958S0OBtCbD9M8VgWEN7DMuqY6', 'disaeses_10');
insert into images(id_image, url, name, externalId) values ('19olDvIyTUKvT6pAd0bDjtN76zW_jaMYN', 'https://drive.google.com/uc?id=19olDvIyTUKvT6pAd0bDjtN76zW_jaMYN&export=view', '19olDvIyTUKvT6pAd0bDjtN76zW_jaMYN', 'disaeses_11');
insert into images(id_image, url, name, externalId) values ('1GgPAXwGtQYVP8VomK1mGIjR6AxNIzrwI', 'https://drive.google.com/uc?id=1GgPAXwGtQYVP8VomK1mGIjR6AxNIzrwI&export=view', '1GgPAXwGtQYVP8VomK1mGIjR6AxNIzrwI', 'disaeses_12');
insert into images(id_image, url, name, externalId) values ('1sCmYNrZnTumIqooWLbYCwGFiQQfNd-n6', 'https://drive.google.com/uc?id=1sCmYNrZnTumIqooWLbYCwGFiQQfNd-n6&export=view', '1sCmYNrZnTumIqooWLbYCwGFiQQfNd-n6', 'disaeses_13');
insert into images(id_image, url, name, externalId) values ('1xXA2rbRTDnkN_i3M5_i2cVNlIvL1124V', 'https://drive.google.com/uc?id=1xXA2rbRTDnkN_i3M5_i2cVNlIvL1124V&export=view', '1xXA2rbRTDnkN_i3M5_i2cVNlIvL1124V', 'disaeses_14');
insert into images(id_image, url, name, externalId) values ('142OW-NMPhJcJfxJk9SWd-7YmSPoNuEXg', 'https://drive.google.com/uc?id=142OW-NMPhJcJfxJk9SWd-7YmSPoNuEXg&export=view', '142OW-NMPhJcJfxJk9SWd-7YmSPoNuEXg', 'disaeses_15');
insert into images(id_image, url, name, externalId) values ('1Bq_pvjUitYnIPIuyxLGTgjnENw4UPWCU', 'https://drive.google.com/uc?id=1Bq_pvjUitYnIPIuyxLGTgjnENw4UPWCU&export=view', '1Bq_pvjUitYnIPIuyxLGTgjnENw4UPWCU', 'disaeses_16');
insert into images(id_image, url, name, externalId) values ('1Egrf2iBeVTuuQhOaxoJBc9eZwDeuK3I1', 'https://drive.google.com/uc?id=1Egrf2iBeVTuuQhOaxoJBc9eZwDeuK3I1&export=view', '1Egrf2iBeVTuuQhOaxoJBc9eZwDeuK3I1', 'disaeses_17');
insert into images(id_image, url, name, externalId) values ('10HmMBt1SUSmYiI3Mogv0Gaum4fFT6XYC', 'https://drive.google.com/uc?id=10HmMBt1SUSmYiI3Mogv0Gaum4fFT6XYC&export=view', '10HmMBt1SUSmYiI3Mogv0Gaum4fFT6XYC', 'disaeses_18');
insert into images(id_image, url, name, externalId) values ('1os0cVJOuSE94hp-rCQGa458in-utce55', 'https://drive.google.com/uc?id=1os0cVJOuSE94hp-rCQGa458in-utce55&export=view', '1os0cVJOuSE94hp-rCQGa458in-utce55', 'disaeses_19');
insert into images(id_image, url, name, externalId) values ('1pYRSOM6D1wU7_4eUvHljYK_jtSWu881C', 'https://drive.google.com/uc?id=1pYRSOM6D1wU7_4eUvHljYK_jtSWu881C&export=view', '1pYRSOM6D1wU7_4eUvHljYK_jtSWu881C', 'disaeses_20');
insert into images(id_image, url, name, externalId) values ('1uJVViKERqaBhYeF8jbZIdYZNPbqFDx75', 'https://drive.google.com/uc?id=1uJVViKERqaBhYeF8jbZIdYZNPbqFDx75&export=view', '1uJVViKERqaBhYeF8jbZIdYZNPbqFDx75', 'disaeses_21');
insert into images(id_image, url, name, externalId) values ('1d5tEk9qyribJ2zoJJe_RbFlaLCsTvwxD', 'https://drive.google.com/uc?id=1d5tEk9qyribJ2zoJJe_RbFlaLCsTvwxD&export=view', '1d5tEk9qyribJ2zoJJe_RbFlaLCsTvwxD', 'disaeses_22');
insert into images(id_image, url, name, externalId) values ('1EaO-iUQEAg2ZbF2-7dyGl8pGZsx67URp', 'https://drive.google.com/uc?id=1EaO-iUQEAg2ZbF2-7dyGl8pGZsx67URp&export=view', '1EaO-iUQEAg2ZbF2-7dyGl8pGZsx67URp', 'disaeses_23');
insert into images(id_image, url, name, externalId) values ('1XilJHsxVmzo7Mz4VOzaVe_Vwl5AiHjBB', 'https://drive.google.com/uc?id=1XilJHsxVmzo7Mz4VOzaVe_Vwl5AiHjBB&export=view', '1XilJHsxVmzo7Mz4VOzaVe_Vwl5AiHjBB', 'disaeses_24');
insert into images(id_image, url, name, externalId) values ('1so1NV4gM8v59EswCND1UlJUM4V6-DQ5y', 'https://drive.google.com/uc?id=1so1NV4gM8v59EswCND1UlJUM4V6-DQ5y&export=view', '1so1NV4gM8v59EswCND1UlJUM4V6-DQ5y', 'disaeses_25');
insert into images(id_image, url, name, externalId) values ('1A5sAqZS_5DHVBzmurnRFTlAVHRXJmYGC', 'https://drive.google.com/uc?id=1A5sAqZS_5DHVBzmurnRFTlAVHRXJmYGC&export=view', '1A5sAqZS_5DHVBzmurnRFTlAVHRXJmYGC', 'disaeses_26');
insert into images(id_image, url, name, externalId) values ('1b5kMlfv0EwW_FX4Mj_cRoRmrJ1J0ttyo', 'https://drive.google.com/uc?id=1b5kMlfv0EwW_FX4Mj_cRoRmrJ1J0ttyo&export=view', '1b5kMlfv0EwW_FX4Mj_cRoRmrJ1J0ttyo', 'disaeses_27');
insert into images(id_image, url, name, externalId) values ('19GYIZDjgxHN6nlb-K4UItO-fpivo3qiX', 'https://drive.google.com/uc?id=19GYIZDjgxHN6nlb-K4UItO-fpivo3qiX&export=view', '19GYIZDjgxHN6nlb-K4UItO-fpivo3qiX', 'disaeses_28');
insert into images(id_image, url, name, externalId) values ('1Tp-n1TLan3PO8A5Hfb8TI7xvC4QhrQGk', 'https://drive.google.com/uc?id=1Tp-n1TLan3PO8A5Hfb8TI7xvC4QhrQGk&export=view', '1Tp-n1TLan3PO8A5Hfb8TI7xvC4QhrQGk', 'disaeses_29');
insert into images(id_image, url, name, externalId) values ('1CnsBgY7gXeduKT0joO8EZ0zBo-xh3C8K', 'https://drive.google.com/uc?id=1CnsBgY7gXeduKT0joO8EZ0zBo-xh3C8K&export=view', '1CnsBgY7gXeduKT0joO8EZ0zBo-xh3C8K', 'disaeses_30');
insert into images(id_image, url, name, externalId) values ('1442uA7RGLN9D898FG6V7dRrLDEEcYCjB', 'https://drive.google.com/uc?id=1442uA7RGLN9D898FG6V7dRrLDEEcYCjB&export=view', '1442uA7RGLN9D898FG6V7dRrLDEEcYCjB', 'disaeses_31');
insert into images(id_image, url, name, externalId) values ('1CiVML4lSTwv0YOYt7YxaMb6iBAQxdUGc', 'https://drive.google.com/uc?id=1CiVML4lSTwv0YOYt7YxaMb6iBAQxdUGc&export=view', '1CiVML4lSTwv0YOYt7YxaMb6iBAQxdUGc', 'disaeses_32');
insert into images(id_image, url, name, externalId) values ('1pucPeXZtMWdtBdSqvVt29O5E8swWhQIl', 'https://drive.google.com/uc?id=1pucPeXZtMWdtBdSqvVt29O5E8swWhQIl&export=view', '1pucPeXZtMWdtBdSqvVt29O5E8swWhQIl', 'disaeses_33');
insert into images(id_image, url, name, externalId) values ('1g1QSbeBTLb4oDpMKYiRcG7oYJvMALjbJ', 'https://drive.google.com/uc?id=1g1QSbeBTLb4oDpMKYiRcG7oYJvMALjbJ&export=view', '1g1QSbeBTLb4oDpMKYiRcG7oYJvMALjbJ', 'disaeses_34');
insert into images(id_image, url, name, externalId) values ('1dxC0h1L-HjNTMgTG9i_EaOP4HyA4rGHg', 'https://drive.google.com/uc?id=1dxC0h1L-HjNTMgTG9i_EaOP4HyA4rGHg&export=view', '1dxC0h1L-HjNTMgTG9i_EaOP4HyA4rGHg', 'disaeses_35');
insert into images(id_image, url, name, externalId) values ('1etUZ3KqRWwSKOc_gI7uFlOWVQyz3tAtz', 'https://drive.google.com/uc?id=1etUZ3KqRWwSKOc_gI7uFlOWVQyz3tAtz&export=view', '1etUZ3KqRWwSKOc_gI7uFlOWVQyz3tAtz', 'disaeses_36');
insert into images(id_image, url, name, externalId) values ('1gaCMCKRb3qdizZmwWx3T-WSPI5xGm1fC', 'https://drive.google.com/uc?id=1gaCMCKRb3qdizZmwWx3T-WSPI5xGm1fC&export=view', '1gaCMCKRb3qdizZmwWx3T-WSPI5xGm1fC', 'disaeses_37');
insert into images(id_image, url, name, externalId) values ('1e0gqB04cxyY062tiWrS-sK7uk_AJpbRU', 'https://drive.google.com/uc?id=1e0gqB04cxyY062tiWrS-sK7uk_AJpbRU&export=view', '1e0gqB04cxyY062tiWrS-sK7uk_AJpbRU', 'disaeses_38');


insert into technique(name, short_description, description, magnification, lightingAngle, imageNormal, imageTechnique, assess) values ('DIFUSA', 'Vista general del segmento anterior (IACLE)', 'Haz de luz circular o difuso que es dirigido oblicuamente al segmento anterior. Se utiliza iluminación baja a media, con el uso opcional de un filtro difusor.','Baja','45 grados','https://drive.google.com/uc?id=1CNhB6wobI3BVGimVTVAejO4NkiMnYEhh&export=view','https://drive.google.com/uc?id=13Pb2avpFnh2vR8hUr6C_3dtjcAqGeSht&export=view', '{"text":"Observación general de:","options":[{"name":"Párpados Párpados y pestañas pestañas"},{"name":"Conjuntiva Conjuntiva y carúncula carúncula"},{"name":"Esclera Esclera y vasos sanguíneos sanguíneos"},{"name":"Córnea"},{"name":"Iris y pupila"}],"intensity":0,"orientation":[45]}');
insert into technique(name, short_description, description, magnification, lightingAngle, imageNormal, imageTechnique, assess) values ('DIRECTA (Paralelepípedo)','Paralelepípedo enfocado en la córnea (IACLE)','El haz luminoso es enfocado en el área a observar. El paralelepípedo, es una hendidura ancha (1 a 3 mm) formando un volumen sólido, enfocado sobre la estructura a ser examinada. Se utiliza una intensidad luminosa baja a media.','Baja a media','De 30 a 45 grados','https://drive.google.com/uc?id=1sks8xT9gW1Dox6a7bCge81m7q9-iAWsw&export=view','https://drive.google.com/uc?id=1Je9BfZLL9mXOCBtQevN0DA8NSBCiOaVu&export=view', '{"options":[{"name":"Córnea:","submenu":[{"name":"Nervios corneales"},{"name":"cicatrices"},{"name":"Abrasiones"},{"name":"infiltrados"},{"name":"pliegues"},{"name":"estrías"}]},{"name":"Superficie del cristalino."},{"name":"Evaluación de la adaptación de lentes de contacto."}],"orientation":[30,45],"intensity":25}');
insert into technique(name, short_description, description, magnification, lightingAngle, imageNormal, imageTechnique, assess) values ('DIRECTA (Sección óptica)','Capas de la córnea (Lowther)','El haz luminoso es enfocado en el área a observar. Se utiliza una Sección Óptica i.e. una hendidura delgada (≤ 1 mm),  1 mm), la cual es enfocada en la córnea. Se cual es enfocada en la córnea. Se utiliza utiliza intensidad luminosa media a alta.','Baja a media','De 30 a 45 grados','https://drive.google.com/uc?id=1rbe2uo7hO9h38NGq0smnnfspp88zNAIk&export=view','https://drive.google.com/uc?id=1d3hWHJq-u9_K1u8O1nRFwSfUW75Esc0y&export=view', '{"options":[{"name":"Estimar el espesor corneal."},{"name":"Determinar la profundidad de cuerpos extraños o de opacidades corneales."},{"name":"Irregularidades corneales."},{"name":"Película lagrimal con fluoresceína."}],"intensity":50,"orientation":[30,45]}');
insert into technique(name, short_description, description, magnification, lightingAngle, imageNormal, imageTechnique, assess) values ('HAZ CÓNICO','Cámara anterior transparente (IACLE)','Consiste en un paralelepípedo de baja altura i.e. 2 mm aprox. Esto da como resultado una fuente de luz cuadrada, brillante y pequeña, la cual es enfocada en la cámara anterior (entre la en la cámara anterior (entre la córnea y el córnea y el cristalino), utilizando una intensidad luminosa alta. Importante: La luz ambiente debe estar completamente disminuida.','Alta','De 30 a 45 grados','https://drive.google.com/uc?id=1cSAYtQiAbYgGkjEgA8_0dAatgy6Iejs9&export=view','https://drive.google.com/uc?id=1z5p9VB59yz7eLwGrqWfjSNRUQemzei97&export=view', '{"text":"Transparencia de la cámara anterior, la cual debe ser totalmente oscura. Si se observan destellos, pigmentos o desechos celulares (fenómeno Tyndall), estamos frente a una respuesta uveal. Normalmente estos hallazgos son signos clínicos de Uveítis.","intensity":75,"orientation":[30,45]}');
insert into technique(name, short_description, description, magnification, lightingAngle, imageNormal, imageTechnique, assess) values ('INDIRECTA','Cicatriz corneal (IACLE)','El haz luminoso (paralelepípedo) se hace incidir en una zona adyacente a la zona a observar (zona lesionada/alterada). Se utiliza un paralelepípedo el cual puede ser enfocado sobre la córnea o el cristalino utilizando iluminación baja a media','Media a alta','De 30 a 45 grados','https://drive.google.com/uc?id=1Pt7GGuhCt0yTKHw2v6elqFji4oM-_X5f&export=view','https://drive.google.com/uc?id=1jWu206-g9kvz3PfBqyXlJznaTh4Owi2Z&export=view', '{"options":[{"name":"Vacuolas epiteliales"},{"name":"Erosiones epiteliales"},{"name":"Cicatrices corneales"},{"name":"Patologías del iris"},{"name":"Esfínter pupilar"}],"intensity":25,"orientation":[30,45]}');
insert into technique(name, short_description, description, magnification, lightingAngle, imageNormal, imageTechnique, assess) values ('DISPERSIÓN ESCLERAL','Nubosidad corneal central (Caroline)','Consiste en un paralelepípedo enfocado en el limbo corneal, de tal forma que toda la córnea es iluminada, bajo el principio óptico de dispersión de la luz. Se utiliza una intensidad luminosa alta.','Baja','De 30 a 45 grados','https://drive.google.com/uc?id=1tVZaMc2foreFJCJf1xA3c4upqMGOP4we&export=view','https://drive.google.com/uc?id=1anp7YoFJ7Opls8sn6y0KMjVC9eHQwUYw&export=view', '{"options":[{"name":"Edema epitelial"},{"name":"Cicatrices corneales"},{"name":"Cuerpos extraños"}],"intensity":75,"orientation":[30,45]}');
insert into technique(name, short_description, description, magnification, lightingAngle, imageNormal, imageTechnique, assess) values ('RETRO-ILUMINACIÓN DIRECTA','Neovascularización corneal (Caroline)','Se aprovecha la luz que se refleja del iris o retina (luz de fondo) que incide sobre la zona corneal a observar. Se utiliza un paralelepípedo, con una intensidad luminosa de media a alta.','Media a alta','60 grados','https://drive.google.com/uc?id=1NAy3BRZ3tCLBdDJU6davqF3OSa71HH-8&export=view','https://drive.google.com/uc?id=10f2_xFyod842tu0T6Bgo8tXfDWUhNQNr&export=view', '{"options":[{"name":"Neovascularización corneal"},{"name":"Cuerpos extraños en córnea"},{"name":"Depósitos en lentes de contacto"}],"intensity":50,"orientation":[60]}');
insert into technique(name, short_description, description, magnification, lightingAngle, imageNormal, imageTechnique, assess) values ('RETRO-ILUMINACIÓN INDIRECTA','Microquistes epiteliales (Zantos)','La luz que se refleja del iris o retina se hace incidir en un área adyacente a la zona corneal a observar. Se utiliza un paralelepípedo con una intensidad luminosa de media a alta.','Media a alta','Ángulo variable','https://drive.google.com/uc?id=1wbtcKwJ0ZtBvV7MOFhazb65kbzLiwgeZ&export=view','https://drive.google.com/uc?id=1jLF6pOoVQICm3g5Je1PdOeattwD5tZxA&export=view', '{"options":[{"name":"Microquistes epiteliales"},{"name":"Vacuolas epiteliales"},{"name":"Distrofias corneale Distrofias corneales"},{"name":"Opacidades del cristalino"},{"name":"Depósitos en lentes de contacto"}],"intensity":50,"orientation":[1]}');

insert into technique(name, short_description, description, magnification, lightingAngle, imageNormal, imageTechnique, assess) values ('REFLEXIÓN ESPECULAR','Gutatta endotelial (Zantos)','Se obtiene cuando el ángulo de incidencia es igual al ángulo de reflexión; de tal manera que el haz reflejado de la córnea pase a través solo de pase a través solo de uno de los oculares uno de los oculares del microscopio. Se utiliza un paralelepípedo con una intensidad luminosa de media a alta.','Alta','60 grados','https://drive.google.com/uc?id=1kGZBCaLb5M_goXHWR8UeorzvfdfVeV0m&export=view','https://drive.google.com/uc?id=1yxPPLhh7wPDlvEGMvpsJbFC-mFpVpE3j&export=view', '{"options":[{"name":"Células del endotelio corneal"},{"name":"Desechos de la película lagrimal"},{"name":"Espesor de la capa lipídica de la película lagrimal (patrones de interferencia)"}],"intensity":75,"orientation":[60]}');
insert into technique(name, short_description, description, magnification, lightingAngle, imageNormal, imageTechnique, assess) values ('Técnica de Van Herick','Profundidad d e cámara anterior normal (Rojas)','Consiste en una sección óptica que se enfoca en el limbo de manera que el “corte tranversal” del haz de luz de la sección óptica corte la óptica corte la córnea e ilumine córnea e ilumine el iris. el iris. El ancho de la sección corneal es comparado con la distancia entre el iris y la corne con la distancia entre el iris y la cornea posterior, es decir, el intervalo acuoso.','Baja','De 60 grados','https://drive.google.com/uc?id=1Honx-UzR4GW7m7_dMpmIXpG3Zpfub4-I&export=view','https://drive.google.com/uc?id=17LhrP5xN_h5XjXjk_jBmdIiFsHp2S23B&export=view', '{"text":"El objetivo es determinar que tan cerca se encuentra el iris con relación a la superficie posterior corneal en la zona limbal. Esta técnica es utilizada para estimar la profundidad de la cámara anterior (CA). La relación normal debe ser 1/4 a 1/2 del espesor de la sección corneal. Igual o menor a 1/4 estamos frente a una CA moderadamente estrecha.","intensity":0,"orientation":[60]}');

insert into technique(name, short_description, description, magnification, lightingAngle, imageNormal, imageTechnique, assess) values ('Iluminación filtrada','Queratitis puntata superficial (IACLE)','Está técnica utiliza el filtro azul de cobalto más la instilación de fluoresceína. Se puede utilizar en combinación con un filtro Wratten #12 (color amarillo) para mejorar el contraste del fluorograma. La intensidad luminosa es variable.','Baja a Alta','Ángulo variable','https://drive.google.com/uc?id=1qxKXywMJKEh3kwosRwGvxCcg02DGzEgK&export=view','https://drive.google.com/uc?id=1594228JqNBXNtK3UjjwRolRh2X0ArjSm&export=view', '{"options":[{"name":"Tinción corneal"},{"name":"Tinción conjuntival"},{"name":"Evalúa el tiempo de ruptura de la película lagrimal (BUT)"},{"name":"Evaluación de Evaluación de la adaptación la adaptación de los lentes de contacto RPG (fluorogramas)"}],"intensity":25,"orientation":[1]}');
insert into technique(name, short_description, description, magnification, lightingAngle, imageNormal, imageTechnique, assess) values ('ILUMINACIÓN TANGENCIAL','Coloboma de iris (IACLE)','Es una iluminación oblicua ubicada hacia el canto externo del ojo del paciente y el sistema de observación frente al ojo del examinador, se utiliza un haz de luz difuso con una intensidad luminosa de media a alta.','Baja a media','De 70 a 90 grados','https://drive.google.com/uc?id=14WVksmlHg2bZEoTX59fB2Sf2SDmskMVZ&export=view','https://drive.google.com/uc?id=1HhMh_1PH3QHeGQDSkGyu1r6l_eycIOzi&export=view', '{"options":[{"name":"Tinción corneal"},{"name":"Tinción conjuntival"},{"name":"Evalúa el tiempo de ruptura de la película lagrimal (BUT)"},{"name":"Evaluación de Evaluación de la adaptación la adaptación de los lentes de contacto RPG (fluorogramas)"}],"intensity":50,"orientation":[70,90]}');
