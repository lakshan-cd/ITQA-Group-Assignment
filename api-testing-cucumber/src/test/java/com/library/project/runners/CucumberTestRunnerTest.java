package com.library.project.runners;

import io.cucumber.junit.Cucumber;
import io.cucumber.junit.CucumberOptions;
import org.junit.platform.suite.api.ConfigurationParameter;
import org.junit.platform.suite.api.IncludeEngines;
import org.junit.platform.suite.api.SelectPackages;
import org.junit.platform.suite.api.Suite;
import org.junit.runner.RunWith;

import static io.cucumber.junit.platform.engine.Constants.GLUE_PROPERTY_NAME;
import static io.cucumber.junit.platform.engine.Constants.PLUGIN_PROPERTY_NAME;

@Suite
@IncludeEngines("cucumber")
@SelectPackages("com.library.project")
@ConfigurationParameter(key = GLUE_PROPERTY_NAME, value = "com.library.project.stepdefinitions")
@ConfigurationParameter(key = PLUGIN_PROPERTY_NAME, value = "io.qameta.allure.cucumber7jvm.AllureCucumber7Jvm")
@CucumberOptions(
        features = "src/test/resources/features/book_post.feature",
        plugin = {
                "pretty",
                "html:target/cucumber-reports.html",
                "json:target/cucumber-reports/cucumber.json",
                "junit:target/cucumber-reports/cucumber.xml",
                "io.qameta.allure.cucumber7jvm.AllureCucumber7Jvm"
        },
        monochrome = true
)
public class CucumberTestRunnerTest {
}
