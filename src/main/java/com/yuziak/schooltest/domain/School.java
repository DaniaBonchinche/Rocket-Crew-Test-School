package com.yuziak.schooltest.domain;


import jakarta.persistence.*;

@Entity
@Table(name = "schools")
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
        private final School school;

        public Builder() {
            school = new School();
        }

        public Builder id(Long id) {
            school.setId(id);
            return this;
        }

        public Builder name(String name) {
            school.setName(name);
            return this;
        }

        public Builder edrpou(String edrpou) {
            school.setEdrpou(edrpou);
            return this;
        }

        public Builder region(String region) {
            school.setRegion(region);
            return this;
        }

        public Builder type(SchoolType type) {
            school.setType(type);
            return this;
        }

        public Builder isActive(boolean isActive) {
            school.setActive(isActive);
            return this;
        }

        public School build() {
            return school;
        }
    }
}
