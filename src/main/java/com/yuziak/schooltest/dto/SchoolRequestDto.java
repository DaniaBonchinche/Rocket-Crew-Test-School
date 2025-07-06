package com.yuziak.schooltest.dto;


import com.yuziak.schooltest.domain.SchoolType;
import lombok.Data;

@Data
public class SchoolRequestDto {
    private String name;
    private String edrpou;
    private String region;
    private SchoolType type;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEdrpou() {
        return edrpou;
    }

    public void setEdrpou(String edrpou) {
        this.edrpou = edrpou;
    }

    public String getRegion() {
        return region;
    }

    public void setRegion(String region) {
        this.region = region;
    }

    public SchoolType getType() {
        return type;
    }

    public void setType(SchoolType type) {
        this.type = type;
    }
}
