node() {

  sh('git rev-parse HEAD > GIT_COMMIT')
  def git_commit=readFile('GIT_COMMIT')
  // short SHA, possibly better for chat notifications, etc.
  def short_commit=git_commit.take(6)
  
  sh('git rev-parse --abbrev-ref HEAD > GIT_BRANCH')
  def git_branch=readFile('GIT_BRANCH')
  // short SHA, possibly better for chat notifications, etc.



  stage 'ENV'

  sh "echo ${short_commit}"
  sh "echo ${git_branch}"
  // stage 'Build Docker Image'
  // sh 'docker build --no-cache -t smallfish/auth .'

  // stage 'Push Docker Image to ECR'
  // sh '''   
  //   docker tag smallfish/auth:latest 315671387076.dkr.ecr.eu-west-1.amazonaws.com/smallfish/auth:test
    
  //   docker push 315671387076.dkr.ecr.eu-west-1.amazonaws.com/smallfish/auth:test
  //   '''

    
}