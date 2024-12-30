pipeline {
    agent any

    environment {
        MAVEN_HOME = tool name: 'Maven' // Name of Maven installation in Jenkins
        NODE_HOME = tool name: 'NodeJS' // Name of Node.js installation in Jenkins
        PATH = "${env.PATH}:${MAVEN_HOME}/bin:${NODE_HOME}/bin"
    }

    stages {
        stage('Checkout Code') {
            steps {
                checkout scm // Pull the code from the repository
            }
        }

        stage('Run Cucumber Tests') {
            steps {
                dir('api-testing-cucumber') {
                    bat 'mvn clean test' // Run Maven tests
                }
            }
        }

        stage('Generate Allure Report for Cucumber') {
            steps {
                dir('api-testing-cucumber') {
                    bat 'allure generate --clean target/allure-results -o allure-report'
                }
            }
        }

        stage('Run Playwright Tests') {
            steps {
                dir('ui-tesing-playwright') {
                    bat 'npm install' // Install dependencies
                    bat 'npx playwright test' // Run Playwright tests
                }
            }
        }

        stage('Generate Allure Report for Playwright') {
            steps {
                dir('ui-tesing-playwright') {
                    bat 'allure generate --clean allure-results -o allure-report'
                }
            }
        }

        stage('Publish Allure Reports') {
            steps {
                allure([
                    results: [[path: 'api-testing-cucumber/target/allure-results']],
                    report: [[path: 'api-testing-cucumber/target/allure-report']],
                    results: [[path: 'ui-tesing-playwright/allure-results']],
                    report: [[path: 'ui-tesing-playwright/allure-report']]
                ])
            }
        }
    }

    post {
        always {
            archiveArtifacts artifacts: '**/allure-report/**', allowEmptyArchive: true
        }
    }
}
