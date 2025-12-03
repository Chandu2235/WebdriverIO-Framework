pipeline {
    agent any

    parameters {
        choice(name: 'TEST_ENV', choices: ['dev', 'staging', 'prod'], description: 'Select test environment')
        choice(name: 'BROWSER', choices: ['chrome', 'firefox', 'headless'], description: 'Select browser for testing')
        booleanParam(name: 'RUN_PARALLEL', defaultValue: true, description: 'Run tests in parallel')
        booleanParam(name: 'UPDATE_TESTRAIL', defaultValue: true, description: 'Update TestRail with results')
        booleanParam(name: 'VALIDATE_DB', defaultValue: true, description: 'Validate database before tests')
    }

    options {
        buildDiscarder(logRotator(numToKeepStr: '10'))
        timeout(time: 1, unit: 'HOURS')
        timestamps()
    }

    environment {
        NODE_ENV        = "${params.TEST_ENV}"
        BROWSER_NAME    = "${params.BROWSER}"
        PARALLEL_INSTANCES = "${params.RUN_PARALLEL ? '4' : '1'}"

        DB_HOST     = credentials('db-host')
        DB_USER     = credentials('db-user')
        DB_PASSWORD = credentials('db-password')
        DB_NAME     = credentials('db-name')

        TESTRAIL_URL        = credentials('testrail-url')
        TESTRAIL_USER       = credentials('testrail-user')
        TESTRAIL_PASSWORD   = credentials('testrail-password')
        TESTRAIL_PROJECT_ID = credentials('testrail-project-id')
        TESTRAIL_SUITE_ID   = credentials('testrail-suite-id')
    }

    stages {

        stage('Checkout') {
            steps {
                ansiColor('xterm') {
                    echo '📂 Checking out code...'
                    checkout scm
                }
            }
        }

        stage('Setup Environment') {
            steps {
                ansiColor('xterm') {
                    echo '⚙️ Setting up environment...'
                    sh '''
                        node --version
                        npm --version
                    '''
                }
            }
        }

        stage('Install Dependencies') {
            steps {
                ansiColor('xterm') {
                    echo '📦 Installing dependencies...'
                    sh 'npm install --legacy-peer-deps'
                }
            }
        }

        stage('Database Validation') {
            when { expression { params.VALIDATE_DB } }
            steps {
                ansiColor('xterm') {
                    echo '🗄️ Validating database connection...'
                    sh 'node src/scripts/database/db-validator.js'
                }
            }
        }

        stage('Database Setup/Reset') {
            when { expression { params.TEST_ENV == 'staging' || params.TEST_ENV == 'dev' } }
            steps {
                ansiColor('xterm') {
                    echo '🔄 Setting up test database...'
                    sh 'node src/scripts/database/db-setup.js'
                }
            }
        }

        stage('Compile TypeScript') {
            steps {
                ansiColor('xterm') {
                    echo '🔨 Compiling TypeScript...'
                    sh 'npx tsc --noEmit -p tsconfig.json'
                }
            }
        }

        stage('Run Tests') {
            steps {
                ansiColor('xterm') {
                    echo '🧪 Running automated tests...'
                    sh '''
                        if [ "${BROWSER_NAME}" = "headless" ]; then
                            npm run test:headless -- --maxInstances=${PARALLEL_INSTANCES}
                        elif [ "${BROWSER_NAME}" = "firefox" ]; then
                            npm run test:firefox -- --maxInstances=${PARALLEL_INSTANCES}
                        else
                            npm test -- --maxInstances=${PARALLEL_INSTANCES}
                        fi
                    '''
                }
            }
        }

        stage('Database Cleanup') {
            steps {
                ansiColor('xterm') {
                    echo '🧹 Cleaning up test data...'
                    sh 'node src/scripts/database/db-cleanup.js'
                }
            }
        }

        stage('TestRail Integration') {
            when { expression { params.UPDATE_TESTRAIL } }
            steps {
                ansiColor('xterm') {
                    echo '📊 Updating TestRail...'
                    sh 'node src/scripts/testrail/testrail-uploader.js'
                }
            }
        }

        stage('Generate Reports') {
            steps {
                ansiColor('xterm') {
                    echo '📈 Generating test reports...'
                    sh 'npm run report || true'
                }
            }
        }
    }

    post {

        always {
            ansiColor('xterm') {
                echo '📋 Collecting test artifacts...'

                junit testResults: 'reports/**/*.xml', allowEmptyResults: true

                publishHTML([
                    allowMissing: false,
                    alwaysLinkToLastBuild: true,
                    keepAll: true,
                    reportDir: 'allure-results',
                    reportFiles: 'index.html',
                    reportName: 'Allure Test Report'
                ])

                archiveArtifacts artifacts: 'reports/**/*.log', allowEmpty: true
            }
        }

        success {
            echo '✅ Pipeline succeeded!'
        }

        failure {
            echo '❌ Pipeline failed!'
        }

        unstable {
            echo '⚠️ Pipeline unstable - some tests failed'
        }

        cleanup {
            echo '🧹 Cleaning workspace...'
            deleteDir()
        }
    }
}
