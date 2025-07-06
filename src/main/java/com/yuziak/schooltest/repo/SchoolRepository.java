package com.yuziak.schooltest.repo;


import com.yuziak.schooltest.domain.School;
import com.yuziak.schooltest.domain.SchoolType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


@Repository
public interface SchoolRepository extends JpaRepository<School, Long> {

    @Query("""
    select s from School s
    where (:region is null or lower(s.region) like lower(cast(concat('%', :region, '%') as string)))
      and (:type is null or s.type = :type)
      and (:isActive is null or s.isActive = :isActive)
""")
    Page<School> findByFilters(
            @Param("region") String region,
            @Param("type") SchoolType type,
            @Param("isActive") Boolean isActive,
            Pageable pageable
    );

}