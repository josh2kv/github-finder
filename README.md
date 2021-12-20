# Github Finder

https://github-finder-josh2kv.netlify.app/
![image](https://user-images.githubusercontent.com/79514508/146836156-6b99910c-2705-4b5f-b030-9d61acd947a8.png)
<br/><br/>

## 1. 소개 및 특징

-   React 학습 프로젝트
-   Github 유저를 검색하고 해당 유저 관련 정보 및 레포를 출력함
-   [Github API][1]를 이용하여 유저정보를 가져오고 Context API로 상태를 관리하며 Functional Component로 컴포넌트를 구현함

    > 학습자료
    >
    > -   [React Front To Back][2]

## 2. 사용기술

-   HTML
-   CSS
-   JavaScript
    -   React

## 3. 학습후기

1. 처음 Class Component로 구현한 코드를 Functional Component로 리팩토링
2. Context API를 이용한 상태관리 추가

    ```
      Github finder
      │
      └───build
      │
      └───public
      │   |   index.html
      │
      └───src
          │   index.js
          │   App.js
          │
          └───components
          |   |
          │   └─── layouts
          |   |     │   ...
          |   |
          │   └─── pages
          |   |     │   ...
          |   |
          │   └─── repos
          |   |     │   ...
          |   |
          │   └─── users
          |         │   ...
          |
          └───context
              |   types.js
              |
              └─── alert
              |     |   alertContext.js
              |     |   alertReducer.js
              |     |   AlertState.js
              |
              └─── github
                    |   githubContext.js
                    |   githubReducer.js
                    |   GithubState.js
    ```

3. 다음은 Redux를 이용한 상태관리 및 MERN 스택 학습 예정

[1]: https://docs.github.com/en/rest
[2]: https://www.udemy.com/course/modern-react-front-to-back/
