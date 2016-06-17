

node() {

  sh('git rev-parse HEAD > GIT_COMMIT')
  String git_commit=readFile('GIT_COMMIT')
  
  
  sh('git rev-parse --abbrev-ref HEAD > GIT_BRANCH')
  String git_branch=readFile('GIT_BRANCH')

  stage 'test'
  sh '''   
    echo "${git_branch}"
    echo "${git_commit}"
    '''

  // stage 'Build Docker Image'
  // sh 'docker build --no-cache -t smallfish/auth .'

  // stage 'Push Docker Image to ECR'
  // sh '''   
  //   docker tag smallfish/auth:latest 315671387076.dkr.ecr.eu-west-1.amazonaws.com/smallfish/auth:${git_branch}-${git_commit}
    
  //   docker push 315671387076.dkr.ecr.eu-west-1.amazonaws.com/smallfish/auth:${git_branch}-${git_commit}
  //   '''

    
}