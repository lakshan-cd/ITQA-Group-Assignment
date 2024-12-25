package com.library.project;

import io.cucumber.java.Before;
import io.cucumber.spring.CucumberContextConfiguration;
import org.springframework.boot.test.context.SpringBootContextLoader;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ContextConfiguration;
import org.team.qa.ninjas.Main;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@CucumberContextConfiguration
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.DEFINED_PORT)
@ContextConfiguration(classes = Main.class)
public class CucumberSpringConfiguration {
    private static final Logger LOG = LoggerFactory.getLogger(CucumberSpringConfiguration.class);

    @Before
    public void setUp() {
        LOG.info("-------------- Spring Context Initialized For Executing Cucumber Tests --------------");
        // Set up any initial configuration if necessary
    }
}
