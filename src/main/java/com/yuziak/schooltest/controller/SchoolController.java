package com.yuziak.schooltest.controller;

import com.yuziak.schooltest.domain.School;
import com.yuziak.schooltest.domain.SchoolType;
import com.yuziak.schooltest.dto.SchoolRequestDto;
import com.yuziak.schooltest.dto.SchoolResponseDto;
import com.yuziak.schooltest.repo.SchoolRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/schools")
@RequiredArgsConstructor
public class SchoolController {

    private final SchoolRepository schoolRepository;


    @GetMapping
    public Page<SchoolResponseDto> getSchools(
            @RequestParam(required = false) String region,
            @RequestParam(required = false) SchoolType type,
            @RequestParam(required = false) Boolean isActive,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        Pageable pageable = PageRequest.of(page, size);

        Page<School> schoolPage = schoolRepository.findByFilters(region, type, isActive, pageable);

        return schoolPage.map(this::toDto);
    }



    @PostMapping
    public ResponseEntity<SchoolResponseDto> createSchool(@RequestBody SchoolRequestDto dto) {
        School school = School.builder()
                .name(dto.getName())
                .edrpou(dto.getEdrpou())
                .region(dto.getRegion())
                .type(dto.getType())
                .isActive(true)
                .build();

        School saved = schoolRepository.save(school);
        return ResponseEntity.ok(toDto(saved));
    }


    @PatchMapping("/{id}/deactivate")
    public ResponseEntity<Void> deactivate(@PathVariable Long id) {
        return schoolRepository.findById(id)
                .map(school -> {
                    school.setActive(false);
                    schoolRepository.save(school);
                    return ResponseEntity.noContent().<Void>build();
                })
                .orElse(ResponseEntity.notFound().build());
    }

    private SchoolResponseDto toDto(School school) {
        return SchoolResponseDto.builder()
                .id(school.getId())
                .name(school.getName())
                .edrpou(school.getEdrpou())
                .region(school.getRegion())
                .type(school.getType())
                .isActive(school.isActive())
                .build();
    }
}
