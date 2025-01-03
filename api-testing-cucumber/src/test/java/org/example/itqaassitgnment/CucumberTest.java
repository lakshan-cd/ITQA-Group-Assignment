package org.example.itqaassitgnment;

import org.junit.platform.suite.api.ConfigurationParameter;
import org.junit.platform.suite.api.IncludeEngines;
import org.junit.platform.suite.api.SelectClasspathResource;
import org.junit.platform.suite.api.Suite;
import static io.cucumber.junit.platform.engine.Constants.GLUE_PROPERTY_NAME;
import static io.cucumber.junit.platform.engine.Constants.PLUGIN_PROPERTY_NAME;

@Suite
@IncludeEngines("cucumber")
@SelectClasspathResource("features")
@ConfigurationParameter(key = PLUGIN_PROPERTY_NAME,
    value = "pretty," +
            "io.qameta.allure.cucumber7jvm.AllureCucumber7Jvm," +
            "html:target/cucumber-reports.html,"+
            "json:target/cucumber-reports/Cucumber.json")
@ConfigurationParameter(key = GLUE_PROPERTY_NAME, value = "org.example.itqaassitgnment")
public class CucumberTest {
} 