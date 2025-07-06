package com.yuziak.schooltest.dto;


import com.yuziak.schooltest.domain.SchoolType;
import lombok.Data;

@Data
public class SchoolRequestDto {
    private String name;
    private String edrpou;
    private String region;
    private SchoolType type;
}
