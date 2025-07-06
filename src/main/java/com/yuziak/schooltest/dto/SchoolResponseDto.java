package com.yuziak.schooltest.dto;


import com.yuziak.schooltest.domain.SchoolType;
import lombok.Data;

@Data
public class SchoolResponseDto {
    private Long id;
    private String name;
    private String edrpou;
    private String region;
    private SchoolType type;
    private boolean isActive;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

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

    public boolean isActive() {
        return isActive;
    }

    public void setActive(boolean active) {
        isActive = active;
    }

    public static Builder builder() {
        return new Builder();
    }

    public static class Builder {
        private final SchoolResponseDto dto;

        public Builder() {
            dto = new SchoolResponseDto();
        }

        public Builder id(Long id) {
            dto.setId(id);
            return this;
        }

        public Builder name(String name) {
            dto.setName(name);
            return this;
        }

        public Builder edrpou(String edrpou) {
            dto.setEdrpou(edrpou);
            return this;
        }

        public Builder region(String region) {
            dto.setRegion(region);
            return this;
        }

        public Builder type(SchoolType type) {
            dto.setType(type);
            return this;
        }

        public Builder isActive(boolean isActive) {
            dto.setActive(isActive);
            return this;
        }

        public SchoolResponseDto build() {
            return dto;
        }
    }
}
