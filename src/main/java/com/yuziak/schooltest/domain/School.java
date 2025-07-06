package com.yuziak.schooltest.domain;


import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "schools")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class School {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String edrpou;

    private String region;

    @Enumerated(EnumType.STRING)
    private SchoolType type;

    @Column(name = "is_active")
    private boolean isActive = true;

}
