package com.example.demo.controller;


import com.example.demo.common.CommonResult;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;

@Slf4j
@RestController
public class DemoController {

    @Value("${upload.path}")
    public String path;

    @PostMapping("/upload")
    public CommonResult upload(MultipartFile[] file) throws IOException {
        File dir = new File(path);
        if (!dir.exists()) {
            dir.mkdirs();
        }

        List<String> names = new ArrayList<>(file.length);

        for (MultipartFile multipartFile : file) {
            String originalFilename = multipartFile.getOriginalFilename();
            String name = originalFilename.toUpperCase(Locale.ROOT);
            multipartFile.transferTo(new File(path + name));
            names.add(name);
        }
        return CommonResult.success().add("names", names);
    }

}
