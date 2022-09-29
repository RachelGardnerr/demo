package com.example.demo;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Locale;

@SpringBootTest
class DemoApplicationTests {

	@Test
	void contextLoads() {

		String str = "asda.jpgsda阿斯达sd.png.jpeg";
		String name = str.toUpperCase(Locale.ROOT);
		if (name.contains(".JPG")||name.contains(".PNG")||name.contains(".JPEG")){
			System.out.println(name);
		}

	}

}
