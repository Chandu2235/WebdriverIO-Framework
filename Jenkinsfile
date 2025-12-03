pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install') {
            steps {
                sh 'npm install'
            }
        }

        stage('Run Tests') {
            steps {
                sh 'npm run test'
            }
        }
    }

    post {
        always {
            node {

                echo "📦 Archiving reports..."
                archiveArtifacts artifacts: 'reports/**/*.log', allowEmptyArchive: true

                echo "📊 Publishing JUnit..."
                junit allowEmptyResults: true, testResults: 'reports/**/*.xml'

                echo "🧹 Cleaning workspace..."
                deleteDir()

                echo "📤 Uploading results to TestRail..."
                sh '''
                    npx wdio run ./wdio.conf.js
                '''
            }
        }

        failure {
            echo "❌ Pipeline failed!"
        }
        success {
            echo "✅ Pipeline passed!"
        }
    }
}
