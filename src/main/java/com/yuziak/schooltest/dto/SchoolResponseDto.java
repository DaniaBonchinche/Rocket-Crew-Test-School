package com.yuziak.schooltest.dto;


import com.yuziak.schooltest.domain.SchoolType;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class SchoolResponseDto {
    private Long id;
    private String name;
    private String edrpou;
    private String region;
    private SchoolType type;
    private boolean isActive;
}
