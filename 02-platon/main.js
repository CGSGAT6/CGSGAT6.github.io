(function () {
  'use strict';

  class _mat4 {
    m = 
    [
      [1, 0, 0, 0],
      [0, 1, 0, 0],
      [0, 0, 1, 0],
      [0, 0, 0, 1]
    ];
    
    constructor(...args) {
      if (args.length == 1 &&  Array.isArray(args[0]) && typeof args[0][0] == "number")
        this.m = 
        [
          [args[0][0], args[0][1], args[0][2], args[0][3]],
          [args[0][4], args[0][5], args[0][6], args[0][7]],
          [args[0][8], args[0][9], args[0][10], args[0][11]],
          [args[0][12], args[0][13], args[0][14], args[0][15]]
        ];
        /*for (let i = 0; i < 4; i++)
          for (let j = 0; j < 4; j++)
            this.m[i][j] = args[0][i * 4 + j];*/
      else if (args.length == 1 && typeof args[0] == "object" && !Array.isArray(args[0]))
        this.m = 
        [
          [args[0].m[0][0], args[0].m[0][1], args[0].m[0][2], args[0].m[0][3]],
          [args[0].m[1][0], args[0].m[1][1], args[0].m[1][2], args[0].m[1][3]],
          [args[0].m[2][0], args[0].m[2][1], args[0].m[2][2], args[0].m[2][3]],
          [args[0].m[3][0], args[0].m[3][1], args[0].m[3][2], args[0].m[3][3]],
        ];
      else if (args.length == 1 && args[0].length == 4 && Array.isArray(args[0][0])) {
        for (let i = 0; i < 4; i++)
          for (let j = 0; j < 4; j++)
            this.m[i][j] = args[0][i][j];
      } else if (args.length == 4 && Array.isArray(args[0])) {
        for (let i = 0; i < 4; i++)
          for (let j = 0; j < 4; j++)
            this.m[i][j] = args[i][j];
      } else if (args.length == 16) {
          for (let i = 0; i < 4; i++)
            for (let j = 0; j < 4; j++)
              this.m[i][j] = args[i * 4 + j];
      } else if (args.length == 1 && typeof args[0] == "number") {
          for (let i = 0; i < 4; i++)
            for (let j = 0; j < 4; j++)
              this.m[i][j] = args[0];
      }
    }

    setIdentity() {
      this.m = 
      [
        [1, 0, 0, 0],
        [0, 1, 0, 0],
        [0, 0, 1, 0],
        [0, 0, 0, 1]
      ];
    }

    identity() {
      return new _mat4();
    }

    determ() {
      return this.m[0][0] * matrDeterm3x3(this.m[1][1], this.m[1][2], this.m[1][3],
                                          this.m[2][1], this.m[2][2], this.m[2][3],
                                          this.m[3][1], this.m[3][2], this.m[3][3]) +
            -this.m[0][1] * matrDeterm3x3(this.m[1][0], this.m[1][2], this.m[1][3],
                                          this.m[2][0], this.m[2][2], this.m[2][3],
                                          this.m[3][0], this.m[3][2], this.m[3][3]) +
            +this.m[0][2] * matrDeterm3x3(this.m[1][0], this.m[1][1], this.m[1][3],
                                          this.m[2][0], this.m[2][1], this.m[2][3],
                                          this.m[3][0], this.m[3][1], this.m[3][3]) +
            -this.m[0][3] * matrDeterm3x3(this.m[1][0], this.m[1][1], this.m[1][2],
                                          this.m[2][0], this.m[2][1], this.m[2][2],
                                          this.m[3][0], this.m[3][1], this.m[3][2]);
    }

    setTranslate(v) {
      this.m = 
      [
        [1, 0, 0, 0],
        [0, 1, 0, 0],
        [0, 0, 1, 0],
        [v.x, v.y, v.z, 1]
      ];
    }

    translate(v) {
      return mat4([1, 0, 0, 0],
                  [0, 1, 0, 0],
                  [0, 0, 1, 0],
                  [v.x, v.y, v.z, 1]);
    }

    mulMatr(a)
    {
      let r = mat4();

      r.m[0][0] = this.m[0][0] * a.m[0][0] + this.m[0][1] * a.m[1][0] + this.m[0][2] * a.m[2][0] +
        this.m[0][3] * a.m[3][0];

      r.m[0][1] = this.m[0][0] * a.m[0][1] + this.m[0][1] * a.m[1][1] + this.m[0][2] * a.m[2][1] +
        this.m[0][3] * a.m[3][1];

      r.m[0][2] = this.m[0][0] * a.m[0][2] + this.m[0][1] * a.m[1][2] + this.m[0][2] * a.m[2][2] +
        this.m[0][3] * a.m[3][2];

      r.m[0][3] = this.m[0][0] * a.m[0][3] + this.m[0][1] * a.m[1][3] + this.m[0][2] * a.m[2][3] +
        this.m[0][3] * a.m[3][3];


      r.m[1][0] = this.m[1][0] * a.m[0][0] + this.m[1][1] * a.m[1][0] + this.m[1][2] * a.m[2][0] +
        this.m[1][3] * a.m[3][0];

      r.m[1][1] = this.m[1][0] * a.m[0][1] + this.m[1][1] * a.m[1][1] + this.m[1][2] * a.m[2][1] +
        this.m[1][3] * a.m[3][1];

      r.m[1][2] = this.m[1][0] * a.m[0][2] + this.m[1][1] * a.m[1][2] + this.m[1][2] * a.m[2][2] +
        this.m[1][3] * a.m[3][2];

      r.m[1][3] = this.m[1][0] * a.m[0][3] + this.m[1][1] * a.m[1][3] + this.m[1][2] * a.m[2][3] +
        this.m[1][3] * a.m[3][3];


      r.m[2][0] = this.m[2][0] * a.m[0][0] + this.m[2][1] * a.m[1][0] + this.m[2][2] * a.m[2][0] +
        this.m[2][3] * a.m[3][0];

      r.m[2][1] = this.m[2][0] * a.m[0][1] + this.m[2][1] * a.m[1][1] + this.m[2][2] * a.m[2][1] +
        this.m[2][3] * a.m[3][1];

      r.m[2][2] = this.m[2][0] * a.m[0][2] + this.m[2][1] * a.m[1][2] + this.m[2][2] * a.m[2][2] +
        this.m[2][3] * a.m[3][2];

      r.m[2][3] = this.m[2][0] * a.m[0][3] + this.m[2][1] * a.m[1][3] + this.m[2][2] * a.m[2][3] +
        this.m[2][3] * a.m[3][3];


      r.m[3][0] = this.m[3][0] * a.m[0][0] + this.m[3][1] * a.m[1][0] + this.m[3][2] * a.m[2][0] +
        this.m[3][3] * a.m[3][0];

      r.m[3][1] = this.m[3][0] * a.m[0][1] + this.m[3][1] * a.m[1][1] + this.m[3][2] * a.m[2][1] +
        this.m[3][3] * a.m[3][1];

      r.m[3][2] = this.m[3][0] * a.m[0][2] + this.m[3][1] * a.m[1][2] + this.m[3][2] * a.m[2][2] +
        this.m[3][3] * a.m[3][2];

      r.m[3][3] = this.m[3][0] * a.m[0][3] + this.m[3][1] * a.m[1][3] + this.m[3][2] * a.m[2][3] +
        this.m[3][3] * a.m[3][3];

      return r;
    }

    inverse() {
      let r = mat4();
      let det = this.determ();

      if (det == 0)
        return;

      /* build adjoint matrix */
      r.m[0][0] =
        +matrDeterm3x3(this.m[1][1], this.m[1][2], this.m[1][3],
                       this.m[2][1], this.m[2][2], this.m[2][3],
                       this.m[3][1], this.m[3][2], this.m[3][3]) / det;

      r.m[1][0] =
        -matrDeterm3x3(this.m[1][0], this.m[1][2], this.m[1][3],
                       this.m[2][0], this.m[2][2], this.m[2][3],
                       this.m[3][0], this.m[3][2], this.m[3][3]) / det;

      r.m[2][0] =
        +matrDeterm3x3(this.m[1][0], this.m[1][1], this.m[1][3],
                       this.m[2][0], this.m[2][1], this.m[2][3],
                       this.m[3][0], this.m[3][1], this.m[3][3]) / det;

      r.m[3][0] =
        -matrDeterm3x3(this.m[1][0], this.m[1][1], this.m[1][2],
                       this.m[2][0], this.m[2][1], this.m[2][2],
                       this.m[3][0], this.m[3][1], this.m[3][2]) / det;

      r.m[0][1] =
        -matrDeterm3x3(this.m[0][1], this.m[0][2], this.m[0][3],
                       this.m[2][1], this.m[2][2], this.m[2][3],
                       this.m[3][1], this.m[3][2], this.m[3][3]) / det;

      r.m[1][1] =
        +matrDeterm3x3(this.m[0][0], this.m[0][2], this.m[0][3],
                       this.m[2][0], this.m[2][2], this.m[2][3],
                       this.m[3][0], this.m[3][2], this.m[3][3]) / det;

      r.m[2][1] =
        -matrDeterm3x3(this.m[0][0], this.m[0][1], this.m[0][3],
                       this.m[2][0], this.m[2][1], this.m[2][3],
                       this.m[3][0], this.m[3][1], this.m[3][3]) / det;

      r.m[3][1] =
        +matrDeterm3x3(this.m[0][0], this.m[0][1], this.m[0][2],
                       this.m[2][0], this.m[2][1], this.m[2][2],
                       this.m[3][0], this.m[3][1], this.m[3][2]) / det;


      r.m[0][2] =
        +matrDeterm3x3(this.m[0][1], this.m[0][2], this.m[0][3],
                       this.m[1][1], this.m[1][2], this.m[1][3],
                       this.m[3][1], this.m[3][2], this.m[3][3]) / det;

      r.m[1][2] =
        -matrDeterm3x3(this.m[0][0], this.m[0][2], this.m[0][3],
                       this.m[1][0], this.m[1][2], this.m[1][3],
                       this.m[3][0], this.m[3][2], this.m[3][3]) / det;

      r.m[2][2] =
        +matrDeterm3x3(this.m[0][0], this.m[0][1], this.m[0][3],
                       this.m[1][0], this.m[1][1], this.m[1][3],
                       this.m[3][0], this.m[3][1], this.m[3][3]) / det;

      r.m[3][2] =
        -matrDeterm3x3(this.m[0][0], this.m[0][1], this.m[0][2],
                       this.m[1][0], this.m[1][1], this.m[1][2],
                       this.m[3][0], this.m[3][1], this.m[3][2]) / det;


      r.m[0][3] =
        -matrDeterm3x3(this.m[0][1], this.m[0][2], this.m[0][3],
                       this.m[1][1], this.m[1][2], this.m[1][3],
                       this.m[2][1], this.m[2][2], this.m[2][3]) / det;

      r.m[1][3] =
        +matrDeterm3x3(this.m[0][0], this.m[0][2], this.m[0][3],
                       this.m[1][0], this.m[1][2], this.m[1][3],
                       this.m[2][0], this.m[2][2], this.m[2][3]) / det;

      r.m[2][3] =
        -matrDeterm3x3(this.m[0][0], this.m[0][1], this.m[0][3],
                       this.m[1][0], this.m[1][1], this.m[1][3],
                       this.m[2][0], this.m[2][1], this.m[2][3]) / det;

      r.m[3][3] =
        +matrDeterm3x3(this.m[0][0], this.m[0][1], this.m[0][2],
                       this.m[1][0], this.m[1][1], this.m[1][2],
                       this.m[2][0], this.m[2][1], this.m[2][2]) / det;

      return r;
    }

    setInverse() {
      let r = mat4();
      let det = this.determ();

      if (det == 0)
        this.setIdentity();

      /* build adjoint matrix */
      r.m[0][0] =
        +matrDeterm3x3(this.m[1][1], this.m[1][2], this.m[1][3],
                       this.m[2][1], this.m[2][2], this.m[2][3],
                       this.m[3][1], this.m[3][2], this.m[3][3]) / det;

      r.m[1][0] =
        -matrDeterm3x3(this.m[1][0], this.m[1][2], this.m[1][3],
                       this.m[2][0], this.m[2][2], this.m[2][3],
                       this.m[3][0], this.m[3][2], this.m[3][3]) / det;

      r.m[2][0] =
        +matrDeterm3x3(this.m[1][0], this.m[1][1], this.m[1][3],
                       this.m[2][0], this.m[2][1], this.m[2][3],
                       this.m[3][0], this.m[3][1], this.m[3][3]) / det;

      r.m[3][0] =
        -matrDeterm3x3(this.m[1][0], this.m[1][1], this.m[1][2],
                       this.m[2][0], this.m[2][1], this.m[2][2],
                       this.m[3][0], this.m[3][1], this.m[3][2]) / det;

      r.m[0][1] =
        -matrDeterm3x3(this.m[0][1], this.m[0][2], this.m[0][3],
                       this.m[2][1], this.m[2][2], this.m[2][3],
                       this.m[3][1], this.m[3][2], this.m[3][3]) / det;

      r.m[1][1] =
        +matrDeterm3x3(this.m[0][0], this.m[0][2], this.m[0][3],
                       this.m[2][0], this.m[2][2], this.m[2][3],
                       this.m[3][0], this.m[3][2], this.m[3][3]) / det;

      r.m[2][1] =
        -matrDeterm3x3(this.m[0][0], this.m[0][1], this.m[0][3],
                       this.m[2][0], this.m[2][1], this.m[2][3],
                       this.m[3][0], this.m[3][1], this.m[3][3]) / det;

      r.m[3][1] =
        +matrDeterm3x3(this.m[0][0], this.m[0][1], this.m[0][2],
                       this.m[2][0], this.m[2][1], this.m[2][2],
                       this.m[3][0], this.m[3][1], this.m[3][2]) / det;


      r.m[0][2] =
        +matrDeterm3x3(this.m[0][1], this.m[0][2], this.m[0][3],
                       this.m[1][1], this.m[1][2], this.m[1][3],
                       this.m[3][1], this.m[3][2], this.m[3][3]) / det;

      r.m[1][2] =
        -matrDeterm3x3(this.m[0][0], this.m[0][2], this.m[0][3],
                       this.m[1][0], this.m[1][2], this.m[1][3],
                       this.m[3][0], this.m[3][2], this.m[3][3]) / det;

      r.m[2][2] =
        +matrDeterm3x3(this.m[0][0], this.m[0][1], this.m[0][3],
                       this.m[1][0], this.m[1][1], this.m[1][3],
                       this.m[3][0], this.m[3][1], this.m[3][3]) / det;

      r.m[3][2] =
        -matrDeterm3x3(this.m[0][0], this.m[0][1], this.m[0][2],
                       this.m[1][0], this.m[1][1], this.m[1][2],
                       this.m[3][0], this.m[3][1], this.m[3][2]) / det;


      r.m[0][3] =
        -matrDeterm3x3(this.m[0][1], this.m[0][2], this.m[0][3],
                       this.m[1][1], this.m[1][2], this.m[1][3],
                       this.m[2][1], this.m[2][2], this.m[2][3]) / det;

      r.m[1][3] =
        +matrDeterm3x3(this.m[0][0], this.m[0][2], this.m[0][3],
                       this.m[1][0], this.m[1][2], this.m[1][3],
                       this.m[2][0], this.m[2][2], this.m[2][3]) / det;

      r.m[2][3] =
        -matrDeterm3x3(this.m[0][0], this.m[0][1], this.m[0][3],
                       this.m[1][0], this.m[1][1], this.m[1][3],
                       this.m[2][0], this.m[2][1], this.m[2][3]) / det;

      r.m[3][3] =
        +matrDeterm3x3(this.m[0][0], this.m[0][1], this.m[0][2],
                       this.m[1][0], this.m[1][1], this.m[1][2],
                       this.m[2][0], this.m[2][1], this.m[2][2]) / det;

      for (let i = 0; i < 4; i++)
        for (let j = 0; j < 4 ; j++)
          this.m[i][j] = r.m[i][j];
    }

    rotate(angle, v) {
      let a = angle * Math.PI / 180, s = Math.sin(a), c = Math.cos(a);

      return mat4(
          c + v.x * v.x * (1 - c), v.y * v.x * (1 - c) - v.z * s, v.z * v.x * (1 - c) + v.y * s, 0,
          v.x * v.y * (1 - c) + v.z * s, c + v.y * v.y * (1 - c), v.z * v.y * (1 - c) - v.x * s, 0,
          v.x * v.z * (1 - c) - v.y * s, v.y * v.z * (1 - c) + v.x * s, c + v.z * v.z * (1 - c), 0,
          0, 0, 0, 1);
    }

    setRotate(angle, v) {
      let a = angle * Math.PI / 180, s = Math.sin(a), c = Math.cos(a);

      this.m =
      [
        [c + v.x * v.x * (1 - c), v.y * v.x * (1 - c) - v.z * s, v.z * v.x * (1 - c) + v.y * s, 0],
        [v.x * v.y * (1 - c) + v.z * s, c + v.y * v.y * (1 - c), v.z * v.y * (1 - c) - v.x * s, 0],
        [v.x * v.z * (1 - c) - v.y * s, v.y * v.z * (1 - c) + v.x * s, c + v.z * v.z * (1 - c), 0],
        [0, 0, 0, 1]
      ];
    }

    view(Loc, At, Up1) {
      let
        Dir = At.subVec(Loc).normalize(),
        Right = Dir.cross(Up1).normalize(),
        Up = Right.cross(Dir).normalize();
      
      return mat4(Right.x, Up.x, -Dir.x, 0,
                   Right.y, Up.y, -Dir.y, 0,
                   Right.z, Up.z, -Dir.z, 0,
                   -Loc.dot(Right), -Loc.dot(Up), Loc.dot(Dir), 1);
    }

    setView(Loc, At, Up1) {
      let
        Dir = At.subVec(Loc).normalize(),
        Right = Dir.cross(Up1).normalize(),
        Up = Right.cross(Dir).normalize();
      
      this.m =
      [
        [Right.x, Up.x, -Dir.x, 0],
        [Right.y, Up.y, -Dir.y, 0],
        [Right.z, Up.z, -Dir.z, 0],
        [-Loc.dot(Right), -Loc.dot(Up), Loc.dot(Dir), 1]
      ];
    }

    frustum(left, right, bottom, top, near, far) {
      return mat4((2 * near) / (right - left), 0, 0, 0,
                   0, (2 * near) / (top - bottom), 0, 0,
                   (right + left) / (right - left), (top + bottom) / (top - bottom), (-((far + near) / (far - near))), (-1),
                   0, 0, (-((2 * near * far) / (far - near))), 0);
    }

    setFrustum(left, right, bottom, top, near, far) {
      this.m =
      [
        [(2 * near) / (right - left), 0, 0, 0],
        [0, (2 * near) / (top - bottom), 0, 0],
        [(right + left) / (right - left), (top + bottom) / (top - bottom), (-((far + near) / (far - near))), (-1)],
        [0, 0, (-((2 * near * far) / (far - near))), 0]
      ];
    }

    transpose() {
      return mat4(this.m[0][0], this.m[1][0], this.m[2][0], this.m[3][0],
        this.m[0][1], this.m[1][1], this.m[2][1], this.m[3][1],
        this.m[0][2], this.m[1][2], this.m[2][2], this.m[3][2],
        this.m[0][3], this.m[1][3], this.m[2][3], this.m[3][3]);
    }

    setTranspose() {
      this.m = 
      [
        [this.m[0][0], this.m[1][0], this.m[2][0], this.m[3][0]],
        [this.m[0][1], this.m[1][1], this.m[2][1], this.m[3][1]],
        [this.m[0][2], this.m[1][2], this.m[2][2], this.m[3][2]],
        [this.m[0][3], this.m[1][3], this.m[2][3], this.m[3][3]]
      ];
    }

    rotateX(angleInDegree) {
      let a = angleInDegree * Math.PI / 180, si = Math.sin(a), co = Math.cos(a);

      return mat4(1, 0, 0, 0,
                  0, co, si, 0,
                  0, -si, co, 0,
                  0, 0, 0, 1);
    }

    setRotateX(angleInDegree) {
      let a = angleInDegree * Math.PI / 180, si = Math.sin(a), co = Math.cos(a);

      this.m = 
      [
        [1, 0, 0, 0],
        [0, co, si, 0],
        [0, -si, co, 0],
        [0, 0, 0, 1]
      ];  
    }

    rotateY(angleInDegree) {
      let a = angleInDegree * Math.PI / 180, si = Math.sin(a), co = Math.cos(a);

      return mat4(co, 0, -si, 0,
                  0, 1, 0, 0,
                  si, 0, co, 0,
                  0, 0, 0, 1);
    }

    setRotateY(angleInDegree) {
      let a = angleInDegree * Math.PI / 180, si = Math.sin(a), co = Math.cos(a);

      this.m = 
      [
        [co, 0, -si, 0],
        [0, 1, 0, 0],
        [si, 0, co, 0],
        [0, 0, 0, 1]
      ];
    }

    rotateZ(angleInDegree) {
      let a = angleInDegree * Math.PI / 180, si = Math.sin(a), co = Math.cos(a);

      return mat4(co, si, 0, 0,
                  -si, co, 0, 0,
                  0, 0, 1, 0,
                  0, 0, 0, 1);
    }

    setRotateZ(angleInDegree)
    {
      let a = angleInDegree * Math.PI / 180, si = Math.sin(a), co = Math.cos(a);

      this.m = 
      [
        [co, si, 0, 0],
        [-si, co, 0, 0],
        [0, 0, 1, 0],
        [0, 0, 0, 1]
      ];
    }

    scale(v) {
      return mat4(v.x, 0, 0, 0,
                  0, v.y, 0, 0,
                  0, 0, v.z, 0,
                  0, 0, 0, 1);
    }

    setScale(v) {
      this.m =
      [
        [v.x, 0, 0, 0],
        [0, v.y, 0, 0],
        [0, 0, v.z, 0],
        [0, 0, 0, 1]
      ];
    }

    ortho(left, right, bottom, top, near, far)
    {
      return mat4(2 / (right - left), 0, 0, 0,
                  0, 2 / (top - bottom), 0, 0,
                  0, 0, -2 / (far - near), 0,
                  -(right + left) / (right - left), -(top + bottom) / (top - bottom), -(far + near) / (far - near), 1);
    }

    setOrtho(left, right, bottom, top, near, far)
    {
      this.m =
      [
        [2 / (right - left), 0, 0, 0],
        [0, 2 / (top - bottom), 0, 0],
        [0, 0, -2 / (far - near), 0],
        [-(right + left) / (right - left), -(top + bottom) / (top - bottom), -(far + near) / (far - near), 1]
      ];
    }

    toArray() {
      return [].concat(...this.m);
    }
  }

  function mat4(...args) {
    return new _mat4(...args);
  }

  function matrDeterm3x3(a11, a12, a13,
                         a21, a22, a23,
                         a31, a32, a33) {
    return a11 * a22 * a33 + a12 * a23 * a31 + a13 * a21 * a32 -
           a11 * a23 * a32 - a12 * a21 * a33 - a13 * a22 * a31;
  }

  class _vec3 {
    x;
    y;
    z;

    constructor(...args) { 
      if (args.length === 3)
        this.x = args[0], this.y = args[1], this.z = args[2];
      else if (typeof args[0] == "object") {
        this.x = args[0].x, this.y = args[0].y, this.z = args[0].z; 
      } else {
        this.x = args[0], this.y = args[0], this.z = args[0]; 
      }
    } // End of 'constructor' function

    // Vector multiplue by number function
    mulNum(num) {
      return vec3(this.x * num, this.y * num, this.z * num);
    } // End of 'mulNum' function

    // Vector divide by number function
    divNum(num) {
      return vec3(this.x / num, this.y / num, this.z / num);
    } // End of 'duvNum' function

    // Vector add number function
    addNum(num) {
      return vec3(this.x + num, this.y + num, this.z + num);
    } // End of 'addNum' function

    // Vector substract number function
    subNum(num) {
      return vec3(this.x - num, this.y - num, this.z - num);
    } // End of 'subNum' function

    // Vector add vector function
    addVec(vec) {
      return vec3(this.x + vec.x, this.y + vec.y, this.z + vec.z);
    } // End of 'addVec' function

    // Vector substract vector function
    subVec(vec) {
      return vec3(this.x - vec.x, this.y - vec.y, this.z - vec.z);
    } // End of 'subVec' function

    // Make vector negative vector
    neg(vec) {
      return vec3(-this.x, -this.y, -this.z);
    } // End of 'neg' function

    // Vector dot product function
    dot(vec) {
      return this.x * vec.x + this.y * vec.y + this.z * vec.z;
    } // End of 'dot' function

    // Vector cross product function
    cross(vec) {
      return vec3(
        this.y * vec.z - this.z * vec.y,
        this.z * vec.x - this.x * vec.z,
        this.x * vec.y - this.y * vec.x);
    } // End of 'cross' function
    
    // Vector lenght evaulating function
    len() {
      let len = this.dot(this);

      if (len == 0 || len == 1)
        return len;

      return Math.sqrt(len);
    } // End of 'len' function

    // Square of vector lenght evaulating function
    len2() {
      return this.dot(this);
    } // End of 'len2' function

    // Vector normalizing function
    normalize() {
      return this.divNum(this.len());
    } // End of 'normalize' function

    // Vector setting normalize function
    setNormalize() {
      let l = this.len();

      this.x /= l;
      this.y /= l;
      this.z /= l;
    } // End of 'normalize' function

    // Vector transform by matrix function
    vectorTransform(a)
    {
      return vec3(this.x * a.m[0][0] + this.y * a.m[1][0] + this.z * a.m[2][0],
                  this.x * a.m[0][1] + this.y * a.m[1][1] + this.z * a.m[2][1],
                  this.x * a.m[0][2] + this.y * a.m[1][2] + this.z * a.m[2][2]);
    } // End of 'vectorTransform' function

    // Vector multiplue by matrix function
    mulMatr(m)
    {
      let w = this.x * a.m[0][3] + this.y * a.m[1][3] + this.z * a.m[2][3] + a.m[3][3];
    
      return vec3((this.x * a.m[0][0] + this.y * a.m[1][0] + this.z * a.m[2][0] + a.m[3][0]) / w,
                    (this.x * a.m[0][1] + this.y * a.m[1][1] + this.z * a.m[2][1] + a.m[3][1]) / w,
                    (this.x * a.m[0][2] + this.y * a.m[1][2] + this.z * a.m[2][2] + a.m[3][2]) / w);
    } // End of 'mulMatr' function

    pointTransform(m)
    {
      return vec3(this.x * a.m[0][0] + this.y * a.m[1][0] + this.z * a.m[2][0] + a.m[3][0],
                this.x * a.m[0][1] + this.y * a.m[1][1] + this.z * a.m[2][1] + a.m[3][1],
                this.x * a.m[0][2] + this.y * a.m[1][2] + this.z * a.m[2][2] + a.m[3][2]);
    } // End of 'pointTransform' function
  }

  // Vector setting function
  function vec3(...args) {
    return new _vec3(...args);
  } // End of 'vec3' function

  class _camera {
    loc;   /* Camera location */
    at;    /* Camera look-at point */
    dir;   /* Camera direction */
    right; /* Camera right direction */
    up;    /* Camera up direction */

    matrView; /* View matrix */
    matrProj; /* Projection matrix */
    matrVP;   /* Stored (View * Proj) matrix */

    frameW; /* Frame width (in pixels) */
    frameH; /* Frame height (in pixels) */

    wp;          /* Project plane size (width) */
    hp;          /* Project plane size (height) */
    projSize;    /* Project plane fit square */
    projDist;    /* Distance to project plane from viewer (near) */
    projFarClip; /* Distance to project for clip plane (far) */

    constructor() {
      this.matrProj = mat4();
      this.matrView = mat4();
      this.matrVP = mat4();

      this.frameH = 1000;
      this.frameW = 1000;

      this.projDist = 0.10;
      this.projFarClip = 300;
      this.projSize = 0.1;
    }
    set(loc, at, up)
    {
      this.matrView.setView(loc, at, up);

      this.right = vec3(this.matrView.m[0][0],
                        this.matrView.m[1][0],
                        this.matrView.m[2][0]);
      this.up = vec3(this.matrView.m[0][1],
                     this.matrView.m[1][1],
                     this.matrView.m[2][1]);
      this.dir = vec3(-this.matrView.m[0][2],
                      -this.matrView.m[1][2],
                      -this.matrView.m[2][2]);
      this.loc = vec3(loc);
      this.at = vec3(at);

      this.matrVP = this.matrView.mulMatr(this.matrProj);
    } // End of 'set' function

    setProj(projSize, projDist, projFarClip)
    {
      let rx, ry;

      this.projDist = projDist;
      this.projFarClip = projFarClip;
      rx = ry = this.projSize = projSize;

      /* Correct aspect ratio */
      if (this.frameW >= this.frameH)
        rx *= this.frameW / this.frameH;
      else
        ry *= this.frameH / this.frameW;

      this.wp = rx;
      this.hp = ry;
      this.matrProj.setFrustum(-rx / 2, rx / 2, -ry / 2, ry / 2, this.projDist, this.projFarClip);
      this.matrVP = this.matrView.mulMatr(this.matrProj);
    } // End of 'setProj' function

    setSize(frameW, frameH)
    {
      this.frameW = frameW;
      this.frameH = frameH;
      this.setProj(this.projSize, this.projDist, this.projFarClip);
    } // End of 'setSize' function
  }

  function camera(){
    return new _camera();
  }

  class _renderObject {
    gl;
    canvas;
    mainCam;
    startTime;
    time;

    primList = [];
    
    constructor (canvasId) {
      this.init(canvasId);
    }

    init (canvasId) {
      this.canvas = document.getElementById(canvasId);
      this.gl = this.canvas.getContext("webgl2");
      this.mainCam = camera();

      this.gl.enable(this.gl.DEPTH_TEST);
      const date = new Date();
      this.time = this.startTime = date.getMinutes() * 60 +
              date.getSeconds() +
              date.getMilliseconds() / 1000;

      this.gl.clearColor(0.30, 0.47, 0.8, 1);

    }

    drawFrame() {
      const date = new Date();
      this.time = date.getMinutes() * 60 +
              date.getSeconds() +
              date.getMilliseconds() / 1000 - this.startTime;

      this.gl.clear(this.gl.COLOR_BUFFER_BIT);
    }

    drawPrim(p) {
      p.primMtlPtn.shd.apply();

      //let mW = mat4().rotateY(47 * this.time);
      let mW = mat4().rotate(47 * this.time, vec3(1, 1, 1).normalize());
      let mWVP = mW.mulMatr(this.mainCam.matrVP);
      let mWInv = mW.inverse().transpose();

      if (p.primMtlPtn.shd.uniforms["MatrWVP"] != undefined)
        this.gl.uniformMatrix4fv(p.primMtlPtn.shd.uniforms["MatrWVP"].loc, false, new Float32Array(mWVP.toArray()));
      if (p.primMtlPtn.shd.uniforms["MatrW"] != undefined) 
        this.gl.uniformMatrix4fv(p.primMtlPtn.shd.uniforms["MatrW"].loc, false, new Float32Array(mW.toArray()));
      if (p.primMtlPtn.shd.uniforms["MatrWInv"] != undefined)
        this.gl.uniformMatrix4fv(p.primMtlPtn.shd.uniforms["MatrWInv"].loc, false, new Float32Array(mWInv.toArray()));
      if (p.primMtlPtn.shd.uniforms["Time"] != undefined)
        this.gl.uniform1f(p.primMtlPtn.shd.uniforms["Time"].loc, this.time);

      this.gl.bindVertexArray(p.vertexArray);
      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, p.vertexBuffer);
      if (p.indexBuffer != undefined) {
        this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, p.indexBuffer);

        this.gl.drawElements(p.type, p.noofI, this.gl.UNSIGNED_INT, 0);
      } else {
        this.gl.drawArrays(p.type, 0, p.noofV);
      }
    }
  }

  function renderObject(canvasId) {
    return new _renderObject(canvasId);
  }

  // -------------------------------------------------
  class _shader {
    glDrawingContext;
    name;

    async create() {
      this.id = null;
      this.shaders =
      [
         {
           id: null,
           type: this.glDrawingContext.VERTEX_SHADER,
           name: "vert",
           src: "",
         },
         {
          id: null,
          type: this.glDrawingContext.FRAGMENT_SHADER,
          name: "frag",
          src: "",
         }
      ];
      for (const s of this.shaders) {
        let response = await fetch(`bin/shaders/${this.name}/${s.name}.glsl`);
        let src = await response.text();
        if (typeof src == "string" && src != "")
          s.src = src;
      }
      // recompile shaders
      this.updateShadersSource();
   }  

    updateShadersSource() { 
      this.shaders[0].id = null;
      this.shaders[1].id = null;
      this.id = null;
      if (this.shaders[0].src == "" || this.shaders[1].src == "")
        return;
      this.shaders.forEach(s => {
        s.id = this.glDrawingContext.createShader(s.type);
        this.glDrawingContext.shaderSource(s.id, s.src);
        this.glDrawingContext.compileShader(s.id);
        if (!this.glDrawingContext.getShaderParameter(s.id, this.glDrawingContext.COMPILE_STATUS)) {
          let buf = this.glDrawingContext.getShaderInfoLog(s.id);
          console.log(`Shader ${this.name}/${s.name} compile fail: ${buf}`);
        }                                            
      });             
   
      this.id = this.glDrawingContext.createProgram();
      this.shaders.forEach(s => {
        if (s.id != null)
          this.glDrawingContext.attachShader(this.id, s.id);
      });
      this.glDrawingContext.linkProgram(this.id);
      if (!this.glDrawingContext.getProgramParameter(this.id, this.glDrawingContext.LINK_STATUS)) {
        let buf = this.glDrawingContext.getProgramInfoLog(this.id);
        console.log(`Shader program ${this.name} link fail: ${buf}`);
      }                                            
      this.updateShaderData();    
    }

    updateShaderData() {
      // Shader attributes
      this.attrs = {};
      const countAttrs = this.glDrawingContext.getProgramParameter(this.id, this.glDrawingContext.ACTIVE_ATTRIBUTES);
      for (let i = 0; i < countAttrs; i++) {
        const info = this.glDrawingContext.getActiveAttrib(this.id, i);
        this.attrs[info.name] = {
          name: info.name,
          type: info.type,
          size: info.size,
          loc: this.glDrawingContext.getAttribLocation(this.id, info.name),
        };
      }
      
      // Shader uniforms
      this.uniforms = {};
      const countUniforms = this.glDrawingContext.getProgramParameter(this.id, this.glDrawingContext.ACTIVE_UNIFORMS);
      for (let i = 0; i < countUniforms; i++) {
        const info = this.glDrawingContext.getActiveUniform(this.id, i);
        this.uniforms[info.name] = {
          name: info.name,
          type: info.type,
          size: info.size,
          loc: this.glDrawingContext.getUniformLocation(this.id, info.name),
        };
      }

      // Shader uniform blocks
      this.uniformBlocks = {};
      const countUniformBlocks = this.glDrawingContext.getProgramParameter(this.id, this.glDrawingContext.ACTIVE_UNIFORM_BLOCKS);
      for (let i = 0; i < countUniformBlocks; i++) {
        const block_name = this.glDrawingContext.getActiveUniformBlockName(this.id, i);
        const index = this.glDrawingContext.getActiveUniformBlockIndex(this.id, block_name);
        this.uniformBlocks[block_name] = {
          name: block_name,
          index: index,
          size: this.glDrawingContext.getActiveUniformBlockParameter(this.id, idx, this.glDrawingContext.UNIFORM_BLOCK_DATA_SIZE),
          bind: this.glDrawingContext.getActiveUniformBlockParameter(this.id, idx, this.glDrawingContext.UNIFORM_BLOCK_BINDING),
        };
      }
      
    }
   
    constructor(name, rndObj) {
      this.glDrawingContext = rndObj.gl;
      this.name = name;
    }
   
    apply() {
      if (this.id != null)
        this.glDrawingContext.useProgram(this.id);
    }
  }

  function shader(name, rndObj) {
    return new _shader(name, rndObj);
  }

  class _materialPattern {
    shd;
    name;

    constructor(name, shdName, rndObj) {
      this.name = name;
      this.shd = shader(shdName, rndObj);
    }
  }

  function materialPattern(name, shdName, rndObj) {
    return new _materialPattern(name, shdName, rndObj);
  }

  class _prim {
    vertexBuffer;
    indexBuffer;
    primMtlPtn;
    vertexArray;
    noofV = 0;
    noovI = 0;
    type;

    constructor(mtlPtn, type, vertexes, indexes) {
      let gl = mtlPtn.shd.glDrawingContext;

      if (type == "triangles")
        this.type = mtlPtn.shd.glDrawingContext.TRIANGLES;
      else if (type == "triangle strip")
        this.type = mtlPtn.shd.glDrawingContext.TRIANGLE_STRIP;
      else if (type == "line strip")
        this.type = mtlPtn.shd.glDrawingContext.LINE_STRIP;
      else if (type == "lines")
        this.type = mtlPtn.shd.glDrawingContext.LINES;
      else if (type == "triangle fun")
        this.type = mtlPtn.shd.glDrawingContext.TRIANGLE_FUN;
      else
        this.type = mtlPtn.shd.glDrawingContext.POINTS;

      let vertFormat = [
        {name : "Position",
         size : 12},
        {name : "Normal",
         size : 12}
        ];
      let vertSize = 0;
      
      vertFormat.forEach((elem) => {
        vertSize += elem.size;
      });

      this.noofV = vertexes.length / (vertSize / 4);

      ///console.log(mtlPtn.shd);

      // vertex buffer
      this.primMtlPtn = mtlPtn;
      this.vertexBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexes), gl.STATIC_DRAW);

      // index buffer
      if (indexes != undefined) {
        this.noofI = indexes.length;
        this.indexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint32Array(indexes), gl.STATIC_DRAW);
      }

      // vertex attribs
      this.vertexArray= gl.createVertexArray();
      gl.bindVertexArray(this.vertexArray);

      let allSize = 0;
      for (let i in vertFormat) {
        let findedAttr = mtlPtn.shd.attrs["In" + vertFormat[i].name];

        if (findedAttr != undefined) {
          let attrLoc = mtlPtn.shd.attrs["In" + vertFormat[i].name].loc;

          if (attrLoc != -1) {
            gl.vertexAttribPointer(attrLoc, vertFormat[i].size / 4, gl.FLOAT, false, vertSize, allSize);
            gl.enableVertexAttribArray(attrLoc);
          }

          allSize += vertFormat[i].size;
        }
      }
    }
  }

  function prim(mtlPtn, type, vertexes, indexes) {
    return new _prim(mtlPtn, type, vertexes, indexes);
  }

  class _vertex {
    pos;
    norm;

    constructor(pos, norm) {
      this.pos = vec3(pos);

      if (norm == undefined)
        this.norm = vec3(0);
      else  
        this.norm = vec3(norm);
    }

    toArray() {
      return [this.pos.x, this.pos.y, this.pos.z, this.norm.x, this.norm.y, this.norm.z];
    }

    createVertexArray(...args) {
      let vs;

      if (args.length == 1 && Array.isArray(args[0]))
        vs = args[0];
      else
        vs = args;

      let v = [];

      vs.forEach(element => {
        v.push(...element.toArray());
      });

      return v;
    }

    autoNormal(vertexes, indexes) {
      for (let i = 0; i < vertexes.length; i++){
        vertexes[i].norm = vec3(0);
      }

      if (indexes == undefined) {
        for (let i = 0; i < vertexes.length; ){
          let v1 = vertexes[i + 1].pos.subVec(vertexes[i].pos);
          let v2 = vertexes[i + 2].pos.subVec(vertexes[i].pos);

          let n = v1.cross(v2);
          
          vertexes[i].norm = vertexes[i].norm.addVec(n);
          vertexes[i + 1].norm = vertexes[i + 1].norm.addVec(n);
          vertexes[i + 2].norm = vertexes[i + 2].norm.addVec(n);

          i += 3;
        }
      } else {
        for (let j = 0; j < indexes.length; ) {
          if (indexes[j] == -1 || indexes[j + 1] == -1 || indexes[j + 2] == -1) {
            j++;
            continue;
          }

          let v1 = vertexes[indexes[j + 1]].pos.subVec(vertexes[indexes[j]].pos);
          let v2 = vertexes[indexes[j + 2]].pos.subVec(vertexes[indexes[j]].pos);

          let n = v1.cross(v2);
          
          vertexes[indexes[j]].norm = vertexes[indexes[j]].norm.addVec(n);
          vertexes[indexes[j + 1]].norm = vertexes[indexes[j + 1]].norm.addVec(n);
          vertexes[indexes[j + 2]].norm = vertexes[indexes[j + 2]].norm.addVec(n);

          j += 3;
        }
      }

      for (let i = 0; i < vertexes.length; i++){
        vertexes[i].norm = vertexes[i].norm.normalize();
      
      }  
      return vertexes;
    
    }

  }

  function vertex(pos, norm) {
    return new _vertex(pos, norm);
  }

  class Platon {
    static cubeCreate(mtlPtn, size) {
      let pnts = [
        vec3(-1, -1, -1), vec3(1, -1, -1),
        vec3(1, -1, 1), vec3(-1, -1, 1),
        vec3(-1, 1, -1), vec3(1, 1, -1),
        vec3(1, 1, 1), vec3(-1, 1, 1),
      ];
      
      let ind = [
        1, 0, 2, 3, -1,
        5, 6, 1, 2, -1,
        6, 7, 2, 3, -1,
        7, 4, 3, 0, -1,
        4, 5, 0, 1, -1,
        4, 5, 7, 6, -1,
      ];
    
      let norms = [
        vec3(0, -1, 0), vec3(1, 0, 0),
        vec3(0, 0, 1), vec3(-1, 0, 0),
        vec3(0, 0, -1), vec3(0, 1, 0),
      ];
    
      let vert = [];
    
      let uInd = [];
    
      let j = 0;
      for (let i = 0; i < ind.length; i++) {
        if (ind[i] != -1) {
          vert.push(vertex(pnts[ind[i]].mulNum(size), norms[Math.floor(i / 5)]));
          uInd.push(j);
          j++;
        }
        else
          uInd.push(-1);
      }
    
      let vertexArr = vertex().createVertexArray(vert);
    
      return prim(mtlPtn, "triangle strip", vertexArr, uInd);
    }
    
    static octCreate(mtlPtn, size) {
      let pnts = [
        vec3(0, 1, 0), vec3(0, 0, 1),
        vec3(-1, 0, 0), vec3(0, 0, -1),
        vec3(1, 0, 0), vec3(0, -1, 0),
      ];
      
      let ind = [
        0, 1, 2,
        0, 2, 3,
        0, 3, 4,
        0, 4, 1,
        5, 1, 2,
        5, 2, 3,
        5, 3, 4,
        5, 4, 1,
      ];
    
      let vert = [];
    
      for (let i = 0; i < ind.length; i++) {
        vert.push(vertex(pnts[ind[i]].mulNum(size)));
      }
    
      vert = vertex().autoNormal(vert);
    
      let vertexArr = vertex().createVertexArray(vert);
    
      return prim(mtlPtn, "triangles", vertexArr);
    
    }
    
    static tetrCreate(mtlPtn, size) {
      const sqrt3 = Math.sqrt(3);
      const sqrt23 = Math.sqrt(2 / 3);
    
      let vt = [
        vertex(vec3(0, 0, sqrt3 / 3)), vertex(vec3(0.5, 0, -sqrt3 / 6)), vertex(vec3(-0.5, 0, -sqrt3 / 6)),
        vertex(vec3(0, sqrt23, 0)), vertex(vec3(0.5, 0, -sqrt3 / 6)), vertex(vec3(-0.5, 0, -sqrt3 / 6)),
        vertex(vec3(0, sqrt23, 0)), vertex(vec3(0.5, 0, -sqrt3 / 6)), vertex(vec3(0, 0, sqrt3 / 3)),
        vertex(vec3(0, sqrt23, 0)), vertex(vec3(-0.5, 0, -sqrt3 / 6)), vertex(vec3(0, 0, sqrt3 / 3)),
      ];
    
      vt.forEach((vert) => {
        vert.pos = vert.pos.mulNum(size);
      });
    
      vt = vertex().autoNormal(vt);
    
      vt = vertex().createVertexArray(vt);
    
      return prim(mtlPtn, "triangles", vt);
    }
    
    static icoCreate(mtlPtn, size) {
      const sqrt5d2 = Math.sqrt(5) / 2;
    
      let pnts = [
        vec3(0, sqrt5d2, 0)
      ];
    
      for (let i = 0; i < 5; i++) {
        pnts.push(vec3(Math.cos((72 * i) * Math.PI /180), 0.5, Math.sin((72 * i) * Math.PI /180)));
      }
    
      for (let i = 0; i < 5; i++) {
        pnts.push(vec3(-Math.cos((72 * i) * Math.PI /180), -0.5, -Math.sin((72 * i) * Math.PI /180)));
      }
    
      pnts.push(vec3(0, -sqrt5d2, 0));
    
      let ind = [
        0, 1, 2,
        0, 2, 3,
        0, 3, 4,
        0, 4, 5,
        0, 5, 1,
        1, 9, 8, 
        1, 2, 9,
        2, 10, 9,
        2, 3, 10,
        3, 6, 10,
        3, 4, 6,
        4, 7, 6,
        4, 5, 7,
        5, 8, 7,
        5, 1, 8,
        11, 6, 7,
        11, 7, 8,
        11, 8, 9,
        11, 9, 10,
        11, 10, 6,
      ];
    
      let vert = [];
    
      for (let i in ind) {
        vert.push(vertex(pnts[ind[i]].mulNum(size)));
      }
    
      vertex().autoNormal(vert);
      
      let vertexArr = vertex().createVertexArray(vert);
    
      return prim(mtlPtn, "triangles", vertexArr);
    }
    
    static dodecCreate(mtlPtn, size) {
      const sqrt5d2 = Math.sqrt(5) / 2;
    
      let pnts0 = [
        vec3(0, sqrt5d2, 0)
      ];
    
      for (let i = 0; i < 5; i++) {
        pnts0.push(vec3(Math.cos((72 * i) * Math.PI /180), 0.5, Math.sin((72 * i) * Math.PI /180)));
      }
    
      for (let i = 0; i < 5; i++) {
        pnts0.push(vec3(-Math.cos((72 * i) * Math.PI /180), -0.5, -Math.sin((72 * i) * Math.PI /180)));
      }
    
      pnts0.push(vec3(0, -sqrt5d2, 0));
    
      let ind = [
        0, 1, 2,
        0, 2, 3,
        0, 3, 4,
        0, 4, 5,
        0, 5, 1,
        1, 9, 8, 
        1, 2, 9,
        2, 10, 9,
        2, 3, 10,
        3, 6, 10,
        3, 4, 6,
        4, 7, 6,
        4, 5, 7,
        5, 8, 7,
        5, 1, 8,
        11, 6, 7,
        11, 7, 8,
        11, 8, 9,
        11, 9, 10,
        11, 10, 6,
      ];
    
      let pnts1 = [];
    
      for (let i = 0; i < ind.length; i += 3) {
        pnts1.push(pnts0[ind[i]].addVec(pnts0[ind[i + 1]]).addVec(pnts0[ind[i + 2]]).divNum(3));
      }
    
      let indexes = [
        0, 1, 2, 0, 2, 3, 0, 3, 4,
        0, 1, 8, 0, 8, 7, 0, 7, 6,
        1, 2, 10, 1, 10, 9, 1, 9, 8,
        2, 3, 12, 2, 12, 11, 2, 11, 10,
        3, 4, 14, 3, 14, 13, 3, 13, 12,
        4, 0, 6, 4, 6, 5, 4, 5, 14,
        7, 8, 9, 7, 9, 19, 7, 19, 18,
        9, 10, 11, 9, 11, 15, 9, 15, 19,
        11, 12, 13, 11, 13, 16, 11, 16, 15,
        13, 14, 5, 13, 5, 17, 13, 17, 16,
        5, 6, 7, 5, 7, 18, 5, 18, 17,
        15, 16, 17, 15, 17, 18, 15, 18, 19,
      ];
    
      let vert = [];
    
      for (let i in indexes) {
        vert.push(vertex(pnts1[indexes[i]].mulNum(size)));
      }
    
      vertex().autoNormal(vert);
      
      let vertexArr = vertex().createVertexArray(vert);
    
      return prim(mtlPtn, "triangles", vertexArr);
    }
    
    static truncedIcoCreate(mtlPtn, size) {
      const sqrt5d2 = Math.sqrt(5) / 2;
    
      let pnts0 = [
        vec3(0, sqrt5d2, 0)
      ];
    
      for (let i = 0; i < 5; i++) {
        pnts0.push(vec3(Math.cos((72 * i) * Math.PI /180), 0.5, Math.sin((72 * i) * Math.PI /180)));
      }
    
      for (let i = 0; i < 5; i++) {
        pnts0.push(vec3(-Math.cos((72 * i) * Math.PI /180), -0.5, -Math.sin((72 * i) * Math.PI /180)));
      }
    
      pnts0.push(vec3(0, -sqrt5d2, 0));

      let ind = [];

      for (let i = 0; i < 5; i++) {
        ind.push(0, i + 1);
      }

      for (let i = 1; i < 6; i++) {
        ind.push(i, 1 + (i) % 5);
      }

      
      let h = [
        1, 9,
        2, 9,
        2, 10,
        3, 10,
        3, 6,
        4, 6,
        4, 7,
        5, 7,
        5, 8,
        1, 8,
      ];
      ind = ind.concat(h);

      for (let i = 1; i < 6; i++) {
        ind.push(5 + i, 6 + i % 5);
      }
      
      for (let i = 0; i < 5; i++) {
        ind.push(11, 5 + i + 1);
      }

      let pnts1 = [];

      for (let i = 0; i < ind.length; i += 2) {
        pnts1.push(
          pnts0[ind[i]].mulNum(2 / 3).addVec(pnts0[ind[i + 1]].mulNum(1 / 3)),
          pnts0[ind[i]].mulNum(1 / 3).addVec(pnts0[ind[i + 1]].mulNum(2 / 3))
        );
      }

      let indexesPent = [
        // up
        [0, 2, 4, 6, 8],
        // 2st lauer
        [1, 10, 20, 38, 19],
        [3, 12, 24, 22, 11],
        [5, 14, 28, 26, 13],
        [7, 15, 30, 32, 16], 
        [9, 18, 36, 34, 17],
        // 2nd lauer
        [21, 23, 46, 57, 45],
        [25, 27, 48, 59, 47],
        [29, 31, 40, 51, 49],
        [33, 35, 42, 53, 41],
        [39, 37, 43, 55, 44],
        // down
        [50, 52, 54, 56, 58],
      ];

      let indexesHex = [
        // up layer
        [0, 1, 10, 11, 3, 2],
        [2, 3, 12, 13, 5, 4],
        [4, 5, 14, 15, 7, 6],
        [6, 7, 16, 17, 9, 8],
        [8, 9, 18, 19, 1, 0],
        // middle layer 
        [20, 21, 23, 22, 11, 10],
        [22, 23, 46, 47, 25, 24],
        [24, 25, 27, 26, 13, 12],
        [26, 27, 48, 49, 29, 28],
        [28, 29, 31, 30, 15, 14],
        [30, 31, 40, 41, 33, 32],
        [32, 33, 35, 34, 17, 16],
        [34, 35, 42, 43, 37, 36],
        [36, 37, 39, 38, 19, 18],
        [38, 39, 44, 45, 21, 20],
        // down layer
        [50, 51, 40, 41, 53, 52],
        [52, 53, 42, 43, 55, 54],
        [54, 55, 44, 45, 57, 56],
        [56, 57, 46, 47, 59, 58],
        [58, 59, 48, 49, 51, 50],
      ];

      let pntsR = [];

      for (let i in indexesPent){
        pntsR.push(...createPentagon(
          pnts1[indexesPent[i][0]],
          pnts1[indexesPent[i][1]],
          pnts1[indexesPent[i][2]],
          pnts1[indexesPent[i][3]],
          pnts1[indexesPent[i][4]]));
      }

      for (let i in indexesHex){
        pntsR.push(...createHexagon(
          pnts1[indexesHex[i][0]],
          pnts1[indexesHex[i][1]],
          pnts1[indexesHex[i][2]],
          pnts1[indexesHex[i][3]],
          pnts1[indexesHex[i][4]],
          pnts1[indexesHex[i][5]]));
      }

      let vert = [];

      for (let i in pntsR) {
        vert.push(vertex(pntsR[i]));
      }

      vertex().autoNormal(vert);
     // ---------------------------------      
      
      let vertexes = vertex().createVertexArray(vert);

      return prim(mtlPtn, "triangles", vertexes);
    }
  }

  function createPentagon(p0, p1, p2, p3, p4) {
    return [
      vec3(p0), vec3(p1), vec3(p2),
      vec3(p0), vec3(p2), vec3(p3),
      vec3(p0), vec3(p3), vec3(p4),
    ]
  }

  function createHexagon(p0, p1, p2, p3, p4, p5) {
    return [
      vec3(p0), vec3(p1), vec3(p2),
      vec3(p0), vec3(p2), vec3(p3),
      vec3(p0), vec3(p3), vec3(p4),
      vec3(p0), vec3(p4), vec3(p5),
    ]
  }

  function main() {
    let 
      truncIcoRnd,
      tetrRnd,
      cubeRnd,
      octRnd,
      dodecRnd,
      icoRnd;
    
    let 
      truncIcoMtlPtn,
      tetrMtnPtn,
      cubeMtlPtn,
      octMtlPtn,
      dodecMtlPtn,
      icoMtlPtn;
    
    let 
      truncIcoPrim,
      tetrPrim,
      cubePrim,
      octPrim,
      dodecPrim,
      icoPrim;

    truncIcoRnd = renderObject("can0");
    tetrRnd = renderObject("can5");
    cubeRnd = renderObject("can1");
    octRnd = renderObject("can2");
    dodecRnd = renderObject("can3");
    icoRnd = renderObject("can4");
   
    
    truncIcoRnd.mainCam.set(vec3(0, 0, 3), vec3(0, 0, 0), vec3(0, 1, 0));
    truncIcoRnd.mainCam.setSize(1000, 1000);
    tetrRnd.mainCam.set(vec3(0, 0, 3), vec3(0, 0, 0), vec3(0, 1, 0));
    tetrRnd.mainCam.setSize(500, 500);
    cubeRnd.mainCam.set(vec3(0, 0, 3), vec3(0, 0, 0), vec3(0, 1, 0));
    cubeRnd.mainCam.setSize(500, 500);
    octRnd.mainCam.set(vec3(0, 0, 3), vec3(0, 0, 0), vec3(0, 1, 0));
    octRnd.mainCam.setSize(500, 500);
    dodecRnd.mainCam.set(vec3(0, 0, 3), vec3(0, 0, 0), vec3(0, 1, 0));
    dodecRnd.mainCam.setSize(500, 500);
    icoRnd.mainCam.set(vec3(0, 0, 3), vec3(0, 0, 0), vec3(0, 1, 0));
    icoRnd.mainCam.setSize(500, 500);

    truncIcoMtlPtn = materialPattern("truncIco", "default", truncIcoRnd);
    tetrMtnPtn = materialPattern("tetr", "default", tetrRnd);
    cubeMtlPtn = materialPattern("cube", "default", cubeRnd);
    octMtlPtn = materialPattern("oct", "default", octRnd);
    dodecMtlPtn = materialPattern("dodec", "default", dodecRnd);
    icoMtlPtn = materialPattern("ico", "default", icoRnd);

    const draw = () => {
      // drawing
      truncIcoRnd.drawFrame();
      tetrRnd.drawFrame();
      cubeRnd.drawFrame();
      octRnd.drawFrame();
      dodecRnd.drawFrame();
      icoRnd.drawFrame();

      truncIcoRnd.drawPrim(truncIcoPrim);
      tetrRnd.drawPrim(tetrPrim);
      cubeRnd.drawPrim(cubePrim);
      octRnd.drawPrim(octPrim);
      dodecRnd.drawPrim(dodecPrim);
      icoRnd.drawPrim(icoPrim);
      // animation register
      window.requestAnimationFrame(draw);
      };

    truncIcoMtlPtn.shd.create().then(() => {
      truncIcoPrim = Platon.truncedIcoCreate(truncIcoMtlPtn, 1);
      cubeMtlPtn.shd.create().then(() => {
        cubePrim = Platon.cubeCreate(cubeMtlPtn, 0.5);
        octMtlPtn.shd.create().then(() => {
          octPrim = Platon.octCreate(octMtlPtn, 1);
          dodecMtlPtn.shd.create().then(() => {
            dodecPrim = Platon.dodecCreate(dodecMtlPtn, 1);
            icoMtlPtn.shd.create().then(() => {
              icoPrim = Platon.icoCreate(icoMtlPtn, 1);
              tetrMtnPtn.shd.create().then(() => {
                tetrPrim = Platon.tetrCreate(tetrMtnPtn, 2);
                draw();
              });
            });
          });
        });
      });
    });
  } 

  window.addEventListener("load", () => {
    main();
  });

})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXMiOlsiLi4vbWF0aC9tYXQ0LmpzIiwiLi4vbWF0aC92ZWMzLmpzIiwiLi4vbWF0aC9jYW1lcmEuanMiLCIuLi9yZW5kZXIvcmVuZF9kZWYuanMiLCIuLi9yZW5kZXIvcmVzL3NoYWRlcnMuanMiLCIuLi9yZW5kZXIvcmVzL21hdGVyaWFsX3BhdHRlcm4uanMiLCIuLi9yZW5kZXIvcmVzL3ByaW0uanMiLCIuLi9yZW5kZXIvcmVzL3ZlcnRleC5qcyIsIi4uL3JlbmRlci9yZXMvZmlndXJlcy5qcyIsIi4uL21haW4uanMiXSwic291cmNlc0NvbnRlbnQiOlsiY2xhc3MgX21hdDQge1xyXG4gIG0gPSBcclxuICBbXHJcbiAgICBbMSwgMCwgMCwgMF0sXHJcbiAgICBbMCwgMSwgMCwgMF0sXHJcbiAgICBbMCwgMCwgMSwgMF0sXHJcbiAgICBbMCwgMCwgMCwgMV1cclxuICBdO1xyXG4gIFxyXG4gIGNvbnN0cnVjdG9yKC4uLmFyZ3MpIHtcclxuICAgIGlmIChhcmdzLmxlbmd0aCA9PSAxICYmICBBcnJheS5pc0FycmF5KGFyZ3NbMF0pICYmIHR5cGVvZiBhcmdzWzBdWzBdID09IFwibnVtYmVyXCIpXHJcbiAgICAgIHRoaXMubSA9IFxyXG4gICAgICBbXHJcbiAgICAgICAgW2FyZ3NbMF1bMF0sIGFyZ3NbMF1bMV0sIGFyZ3NbMF1bMl0sIGFyZ3NbMF1bM11dLFxyXG4gICAgICAgIFthcmdzWzBdWzRdLCBhcmdzWzBdWzVdLCBhcmdzWzBdWzZdLCBhcmdzWzBdWzddXSxcclxuICAgICAgICBbYXJnc1swXVs4XSwgYXJnc1swXVs5XSwgYXJnc1swXVsxMF0sIGFyZ3NbMF1bMTFdXSxcclxuICAgICAgICBbYXJnc1swXVsxMl0sIGFyZ3NbMF1bMTNdLCBhcmdzWzBdWzE0XSwgYXJnc1swXVsxNV1dXHJcbiAgICAgIF07XHJcbiAgICAgIC8qZm9yIChsZXQgaSA9IDA7IGkgPCA0OyBpKyspXHJcbiAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCA0OyBqKyspXHJcbiAgICAgICAgICB0aGlzLm1baV1bal0gPSBhcmdzWzBdW2kgKiA0ICsgal07Ki9cclxuICAgIGVsc2UgaWYgKGFyZ3MubGVuZ3RoID09IDEgJiYgdHlwZW9mIGFyZ3NbMF0gPT0gXCJvYmplY3RcIiAmJiAhQXJyYXkuaXNBcnJheShhcmdzWzBdKSlcclxuICAgICAgdGhpcy5tID0gXHJcbiAgICAgIFtcclxuICAgICAgICBbYXJnc1swXS5tWzBdWzBdLCBhcmdzWzBdLm1bMF1bMV0sIGFyZ3NbMF0ubVswXVsyXSwgYXJnc1swXS5tWzBdWzNdXSxcclxuICAgICAgICBbYXJnc1swXS5tWzFdWzBdLCBhcmdzWzBdLm1bMV1bMV0sIGFyZ3NbMF0ubVsxXVsyXSwgYXJnc1swXS5tWzFdWzNdXSxcclxuICAgICAgICBbYXJnc1swXS5tWzJdWzBdLCBhcmdzWzBdLm1bMl1bMV0sIGFyZ3NbMF0ubVsyXVsyXSwgYXJnc1swXS5tWzJdWzNdXSxcclxuICAgICAgICBbYXJnc1swXS5tWzNdWzBdLCBhcmdzWzBdLm1bM11bMV0sIGFyZ3NbMF0ubVszXVsyXSwgYXJnc1swXS5tWzNdWzNdXSxcclxuICAgICAgXTtcclxuICAgIGVsc2UgaWYgKGFyZ3MubGVuZ3RoID09IDEgJiYgYXJnc1swXS5sZW5ndGggPT0gNCAmJiBBcnJheS5pc0FycmF5KGFyZ3NbMF1bMF0pKSB7XHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNDsgaSsrKVxyXG4gICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgNDsgaisrKVxyXG4gICAgICAgICAgdGhpcy5tW2ldW2pdID0gYXJnc1swXVtpXVtqXTtcclxuICAgIH0gZWxzZSBpZiAoYXJncy5sZW5ndGggPT0gNCAmJiBBcnJheS5pc0FycmF5KGFyZ3NbMF0pKSB7XHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNDsgaSsrKVxyXG4gICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgNDsgaisrKVxyXG4gICAgICAgICAgdGhpcy5tW2ldW2pdID0gYXJnc1tpXVtqXTtcclxuICAgIH0gZWxzZSBpZiAoYXJncy5sZW5ndGggPT0gMTYpIHtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDQ7IGkrKylcclxuICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgNDsgaisrKVxyXG4gICAgICAgICAgICB0aGlzLm1baV1bal0gPSBhcmdzW2kgKiA0ICsgal07XHJcbiAgICB9IGVsc2UgaWYgKGFyZ3MubGVuZ3RoID09IDEgJiYgdHlwZW9mIGFyZ3NbMF0gPT0gXCJudW1iZXJcIikge1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNDsgaSsrKVxyXG4gICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCA0OyBqKyspXHJcbiAgICAgICAgICAgIHRoaXMubVtpXVtqXSA9IGFyZ3NbMF07XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBzZXRJZGVudGl0eSgpIHtcclxuICAgIHRoaXMubSA9IFxyXG4gICAgW1xyXG4gICAgICBbMSwgMCwgMCwgMF0sXHJcbiAgICAgIFswLCAxLCAwLCAwXSxcclxuICAgICAgWzAsIDAsIDEsIDBdLFxyXG4gICAgICBbMCwgMCwgMCwgMV1cclxuICAgIF07XHJcbiAgfVxyXG5cclxuICBpZGVudGl0eSgpIHtcclxuICAgIHJldHVybiBuZXcgX21hdDQoKTtcclxuICB9XHJcblxyXG4gIGRldGVybSgpIHtcclxuICAgIHJldHVybiB0aGlzLm1bMF1bMF0gKiBtYXRyRGV0ZXJtM3gzKHRoaXMubVsxXVsxXSwgdGhpcy5tWzFdWzJdLCB0aGlzLm1bMV1bM10sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1bMl1bMV0sIHRoaXMubVsyXVsyXSwgdGhpcy5tWzJdWzNdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tWzNdWzFdLCB0aGlzLm1bM11bMl0sIHRoaXMubVszXVszXSkgK1xyXG4gICAgICAgICAgLXRoaXMubVswXVsxXSAqIG1hdHJEZXRlcm0zeDModGhpcy5tWzFdWzBdLCB0aGlzLm1bMV1bMl0sIHRoaXMubVsxXVszXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubVsyXVswXSwgdGhpcy5tWzJdWzJdLCB0aGlzLm1bMl1bM10sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1bM11bMF0sIHRoaXMubVszXVsyXSwgdGhpcy5tWzNdWzNdKSArXHJcbiAgICAgICAgICArdGhpcy5tWzBdWzJdICogbWF0ckRldGVybTN4Myh0aGlzLm1bMV1bMF0sIHRoaXMubVsxXVsxXSwgdGhpcy5tWzFdWzNdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tWzJdWzBdLCB0aGlzLm1bMl1bMV0sIHRoaXMubVsyXVszXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubVszXVswXSwgdGhpcy5tWzNdWzFdLCB0aGlzLm1bM11bM10pICtcclxuICAgICAgICAgIC10aGlzLm1bMF1bM10gKiBtYXRyRGV0ZXJtM3gzKHRoaXMubVsxXVswXSwgdGhpcy5tWzFdWzFdLCB0aGlzLm1bMV1bMl0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1bMl1bMF0sIHRoaXMubVsyXVsxXSwgdGhpcy5tWzJdWzJdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tWzNdWzBdLCB0aGlzLm1bM11bMV0sIHRoaXMubVszXVsyXSk7XHJcbiAgfVxyXG5cclxuICBzZXRUcmFuc2xhdGUodikge1xyXG4gICAgdGhpcy5tID0gXHJcbiAgICBbXHJcbiAgICAgIFsxLCAwLCAwLCAwXSxcclxuICAgICAgWzAsIDEsIDAsIDBdLFxyXG4gICAgICBbMCwgMCwgMSwgMF0sXHJcbiAgICAgIFt2LngsIHYueSwgdi56LCAxXVxyXG4gICAgXTtcclxuICB9XHJcblxyXG4gIHRyYW5zbGF0ZSh2KSB7XHJcbiAgICByZXR1cm4gbWF0NChbMSwgMCwgMCwgMF0sXHJcbiAgICAgICAgICAgICAgICBbMCwgMSwgMCwgMF0sXHJcbiAgICAgICAgICAgICAgICBbMCwgMCwgMSwgMF0sXHJcbiAgICAgICAgICAgICAgICBbdi54LCB2LnksIHYueiwgMV0pO1xyXG4gIH1cclxuXHJcbiAgbXVsTWF0cihhKVxyXG4gIHtcclxuICAgIGxldCByID0gbWF0NCgpO1xyXG5cclxuICAgIHIubVswXVswXSA9IHRoaXMubVswXVswXSAqIGEubVswXVswXSArIHRoaXMubVswXVsxXSAqIGEubVsxXVswXSArIHRoaXMubVswXVsyXSAqIGEubVsyXVswXSArXHJcbiAgICAgIHRoaXMubVswXVszXSAqIGEubVszXVswXTtcclxuXHJcbiAgICByLm1bMF1bMV0gPSB0aGlzLm1bMF1bMF0gKiBhLm1bMF1bMV0gKyB0aGlzLm1bMF1bMV0gKiBhLm1bMV1bMV0gKyB0aGlzLm1bMF1bMl0gKiBhLm1bMl1bMV0gK1xyXG4gICAgICB0aGlzLm1bMF1bM10gKiBhLm1bM11bMV07XHJcblxyXG4gICAgci5tWzBdWzJdID0gdGhpcy5tWzBdWzBdICogYS5tWzBdWzJdICsgdGhpcy5tWzBdWzFdICogYS5tWzFdWzJdICsgdGhpcy5tWzBdWzJdICogYS5tWzJdWzJdICtcclxuICAgICAgdGhpcy5tWzBdWzNdICogYS5tWzNdWzJdO1xyXG5cclxuICAgIHIubVswXVszXSA9IHRoaXMubVswXVswXSAqIGEubVswXVszXSArIHRoaXMubVswXVsxXSAqIGEubVsxXVszXSArIHRoaXMubVswXVsyXSAqIGEubVsyXVszXSArXHJcbiAgICAgIHRoaXMubVswXVszXSAqIGEubVszXVszXTtcclxuXHJcblxyXG4gICAgci5tWzFdWzBdID0gdGhpcy5tWzFdWzBdICogYS5tWzBdWzBdICsgdGhpcy5tWzFdWzFdICogYS5tWzFdWzBdICsgdGhpcy5tWzFdWzJdICogYS5tWzJdWzBdICtcclxuICAgICAgdGhpcy5tWzFdWzNdICogYS5tWzNdWzBdO1xyXG5cclxuICAgIHIubVsxXVsxXSA9IHRoaXMubVsxXVswXSAqIGEubVswXVsxXSArIHRoaXMubVsxXVsxXSAqIGEubVsxXVsxXSArIHRoaXMubVsxXVsyXSAqIGEubVsyXVsxXSArXHJcbiAgICAgIHRoaXMubVsxXVszXSAqIGEubVszXVsxXTtcclxuXHJcbiAgICByLm1bMV1bMl0gPSB0aGlzLm1bMV1bMF0gKiBhLm1bMF1bMl0gKyB0aGlzLm1bMV1bMV0gKiBhLm1bMV1bMl0gKyB0aGlzLm1bMV1bMl0gKiBhLm1bMl1bMl0gK1xyXG4gICAgICB0aGlzLm1bMV1bM10gKiBhLm1bM11bMl07XHJcblxyXG4gICAgci5tWzFdWzNdID0gdGhpcy5tWzFdWzBdICogYS5tWzBdWzNdICsgdGhpcy5tWzFdWzFdICogYS5tWzFdWzNdICsgdGhpcy5tWzFdWzJdICogYS5tWzJdWzNdICtcclxuICAgICAgdGhpcy5tWzFdWzNdICogYS5tWzNdWzNdO1xyXG5cclxuXHJcbiAgICByLm1bMl1bMF0gPSB0aGlzLm1bMl1bMF0gKiBhLm1bMF1bMF0gKyB0aGlzLm1bMl1bMV0gKiBhLm1bMV1bMF0gKyB0aGlzLm1bMl1bMl0gKiBhLm1bMl1bMF0gK1xyXG4gICAgICB0aGlzLm1bMl1bM10gKiBhLm1bM11bMF07XHJcblxyXG4gICAgci5tWzJdWzFdID0gdGhpcy5tWzJdWzBdICogYS5tWzBdWzFdICsgdGhpcy5tWzJdWzFdICogYS5tWzFdWzFdICsgdGhpcy5tWzJdWzJdICogYS5tWzJdWzFdICtcclxuICAgICAgdGhpcy5tWzJdWzNdICogYS5tWzNdWzFdO1xyXG5cclxuICAgIHIubVsyXVsyXSA9IHRoaXMubVsyXVswXSAqIGEubVswXVsyXSArIHRoaXMubVsyXVsxXSAqIGEubVsxXVsyXSArIHRoaXMubVsyXVsyXSAqIGEubVsyXVsyXSArXHJcbiAgICAgIHRoaXMubVsyXVszXSAqIGEubVszXVsyXTtcclxuXHJcbiAgICByLm1bMl1bM10gPSB0aGlzLm1bMl1bMF0gKiBhLm1bMF1bM10gKyB0aGlzLm1bMl1bMV0gKiBhLm1bMV1bM10gKyB0aGlzLm1bMl1bMl0gKiBhLm1bMl1bM10gK1xyXG4gICAgICB0aGlzLm1bMl1bM10gKiBhLm1bM11bM107XHJcblxyXG5cclxuICAgIHIubVszXVswXSA9IHRoaXMubVszXVswXSAqIGEubVswXVswXSArIHRoaXMubVszXVsxXSAqIGEubVsxXVswXSArIHRoaXMubVszXVsyXSAqIGEubVsyXVswXSArXHJcbiAgICAgIHRoaXMubVszXVszXSAqIGEubVszXVswXTtcclxuXHJcbiAgICByLm1bM11bMV0gPSB0aGlzLm1bM11bMF0gKiBhLm1bMF1bMV0gKyB0aGlzLm1bM11bMV0gKiBhLm1bMV1bMV0gKyB0aGlzLm1bM11bMl0gKiBhLm1bMl1bMV0gK1xyXG4gICAgICB0aGlzLm1bM11bM10gKiBhLm1bM11bMV07XHJcblxyXG4gICAgci5tWzNdWzJdID0gdGhpcy5tWzNdWzBdICogYS5tWzBdWzJdICsgdGhpcy5tWzNdWzFdICogYS5tWzFdWzJdICsgdGhpcy5tWzNdWzJdICogYS5tWzJdWzJdICtcclxuICAgICAgdGhpcy5tWzNdWzNdICogYS5tWzNdWzJdO1xyXG5cclxuICAgIHIubVszXVszXSA9IHRoaXMubVszXVswXSAqIGEubVswXVszXSArIHRoaXMubVszXVsxXSAqIGEubVsxXVszXSArIHRoaXMubVszXVsyXSAqIGEubVsyXVszXSArXHJcbiAgICAgIHRoaXMubVszXVszXSAqIGEubVszXVszXTtcclxuXHJcbiAgICByZXR1cm4gcjtcclxuICB9XHJcblxyXG4gIGludmVyc2UoKSB7XHJcbiAgICBsZXQgciA9IG1hdDQoKTtcclxuICAgIGxldCBkZXQgPSB0aGlzLmRldGVybSgpO1xyXG5cclxuICAgIGlmIChkZXQgPT0gMClcclxuICAgICAgcmV0dXJuO1xyXG5cclxuICAgIC8qIGJ1aWxkIGFkam9pbnQgbWF0cml4ICovXHJcbiAgICByLm1bMF1bMF0gPVxyXG4gICAgICArbWF0ckRldGVybTN4Myh0aGlzLm1bMV1bMV0sIHRoaXMubVsxXVsyXSwgdGhpcy5tWzFdWzNdLFxyXG4gICAgICAgICAgICAgICAgICAgICB0aGlzLm1bMl1bMV0sIHRoaXMubVsyXVsyXSwgdGhpcy5tWzJdWzNdLFxyXG4gICAgICAgICAgICAgICAgICAgICB0aGlzLm1bM11bMV0sIHRoaXMubVszXVsyXSwgdGhpcy5tWzNdWzNdKSAvIGRldDtcclxuXHJcbiAgICByLm1bMV1bMF0gPVxyXG4gICAgICAtbWF0ckRldGVybTN4Myh0aGlzLm1bMV1bMF0sIHRoaXMubVsxXVsyXSwgdGhpcy5tWzFdWzNdLFxyXG4gICAgICAgICAgICAgICAgICAgICB0aGlzLm1bMl1bMF0sIHRoaXMubVsyXVsyXSwgdGhpcy5tWzJdWzNdLFxyXG4gICAgICAgICAgICAgICAgICAgICB0aGlzLm1bM11bMF0sIHRoaXMubVszXVsyXSwgdGhpcy5tWzNdWzNdKSAvIGRldDtcclxuXHJcbiAgICByLm1bMl1bMF0gPVxyXG4gICAgICArbWF0ckRldGVybTN4Myh0aGlzLm1bMV1bMF0sIHRoaXMubVsxXVsxXSwgdGhpcy5tWzFdWzNdLFxyXG4gICAgICAgICAgICAgICAgICAgICB0aGlzLm1bMl1bMF0sIHRoaXMubVsyXVsxXSwgdGhpcy5tWzJdWzNdLFxyXG4gICAgICAgICAgICAgICAgICAgICB0aGlzLm1bM11bMF0sIHRoaXMubVszXVsxXSwgdGhpcy5tWzNdWzNdKSAvIGRldDtcclxuXHJcbiAgICByLm1bM11bMF0gPVxyXG4gICAgICAtbWF0ckRldGVybTN4Myh0aGlzLm1bMV1bMF0sIHRoaXMubVsxXVsxXSwgdGhpcy5tWzFdWzJdLFxyXG4gICAgICAgICAgICAgICAgICAgICB0aGlzLm1bMl1bMF0sIHRoaXMubVsyXVsxXSwgdGhpcy5tWzJdWzJdLFxyXG4gICAgICAgICAgICAgICAgICAgICB0aGlzLm1bM11bMF0sIHRoaXMubVszXVsxXSwgdGhpcy5tWzNdWzJdKSAvIGRldDtcclxuXHJcbiAgICByLm1bMF1bMV0gPVxyXG4gICAgICAtbWF0ckRldGVybTN4Myh0aGlzLm1bMF1bMV0sIHRoaXMubVswXVsyXSwgdGhpcy5tWzBdWzNdLFxyXG4gICAgICAgICAgICAgICAgICAgICB0aGlzLm1bMl1bMV0sIHRoaXMubVsyXVsyXSwgdGhpcy5tWzJdWzNdLFxyXG4gICAgICAgICAgICAgICAgICAgICB0aGlzLm1bM11bMV0sIHRoaXMubVszXVsyXSwgdGhpcy5tWzNdWzNdKSAvIGRldDtcclxuXHJcbiAgICByLm1bMV1bMV0gPVxyXG4gICAgICArbWF0ckRldGVybTN4Myh0aGlzLm1bMF1bMF0sIHRoaXMubVswXVsyXSwgdGhpcy5tWzBdWzNdLFxyXG4gICAgICAgICAgICAgICAgICAgICB0aGlzLm1bMl1bMF0sIHRoaXMubVsyXVsyXSwgdGhpcy5tWzJdWzNdLFxyXG4gICAgICAgICAgICAgICAgICAgICB0aGlzLm1bM11bMF0sIHRoaXMubVszXVsyXSwgdGhpcy5tWzNdWzNdKSAvIGRldDtcclxuXHJcbiAgICByLm1bMl1bMV0gPVxyXG4gICAgICAtbWF0ckRldGVybTN4Myh0aGlzLm1bMF1bMF0sIHRoaXMubVswXVsxXSwgdGhpcy5tWzBdWzNdLFxyXG4gICAgICAgICAgICAgICAgICAgICB0aGlzLm1bMl1bMF0sIHRoaXMubVsyXVsxXSwgdGhpcy5tWzJdWzNdLFxyXG4gICAgICAgICAgICAgICAgICAgICB0aGlzLm1bM11bMF0sIHRoaXMubVszXVsxXSwgdGhpcy5tWzNdWzNdKSAvIGRldDtcclxuXHJcbiAgICByLm1bM11bMV0gPVxyXG4gICAgICArbWF0ckRldGVybTN4Myh0aGlzLm1bMF1bMF0sIHRoaXMubVswXVsxXSwgdGhpcy5tWzBdWzJdLFxyXG4gICAgICAgICAgICAgICAgICAgICB0aGlzLm1bMl1bMF0sIHRoaXMubVsyXVsxXSwgdGhpcy5tWzJdWzJdLFxyXG4gICAgICAgICAgICAgICAgICAgICB0aGlzLm1bM11bMF0sIHRoaXMubVszXVsxXSwgdGhpcy5tWzNdWzJdKSAvIGRldDtcclxuXHJcblxyXG4gICAgci5tWzBdWzJdID1cclxuICAgICAgK21hdHJEZXRlcm0zeDModGhpcy5tWzBdWzFdLCB0aGlzLm1bMF1bMl0sIHRoaXMubVswXVszXSxcclxuICAgICAgICAgICAgICAgICAgICAgdGhpcy5tWzFdWzFdLCB0aGlzLm1bMV1bMl0sIHRoaXMubVsxXVszXSxcclxuICAgICAgICAgICAgICAgICAgICAgdGhpcy5tWzNdWzFdLCB0aGlzLm1bM11bMl0sIHRoaXMubVszXVszXSkgLyBkZXQ7XHJcblxyXG4gICAgci5tWzFdWzJdID1cclxuICAgICAgLW1hdHJEZXRlcm0zeDModGhpcy5tWzBdWzBdLCB0aGlzLm1bMF1bMl0sIHRoaXMubVswXVszXSxcclxuICAgICAgICAgICAgICAgICAgICAgdGhpcy5tWzFdWzBdLCB0aGlzLm1bMV1bMl0sIHRoaXMubVsxXVszXSxcclxuICAgICAgICAgICAgICAgICAgICAgdGhpcy5tWzNdWzBdLCB0aGlzLm1bM11bMl0sIHRoaXMubVszXVszXSkgLyBkZXQ7XHJcblxyXG4gICAgci5tWzJdWzJdID1cclxuICAgICAgK21hdHJEZXRlcm0zeDModGhpcy5tWzBdWzBdLCB0aGlzLm1bMF1bMV0sIHRoaXMubVswXVszXSxcclxuICAgICAgICAgICAgICAgICAgICAgdGhpcy5tWzFdWzBdLCB0aGlzLm1bMV1bMV0sIHRoaXMubVsxXVszXSxcclxuICAgICAgICAgICAgICAgICAgICAgdGhpcy5tWzNdWzBdLCB0aGlzLm1bM11bMV0sIHRoaXMubVszXVszXSkgLyBkZXQ7XHJcblxyXG4gICAgci5tWzNdWzJdID1cclxuICAgICAgLW1hdHJEZXRlcm0zeDModGhpcy5tWzBdWzBdLCB0aGlzLm1bMF1bMV0sIHRoaXMubVswXVsyXSxcclxuICAgICAgICAgICAgICAgICAgICAgdGhpcy5tWzFdWzBdLCB0aGlzLm1bMV1bMV0sIHRoaXMubVsxXVsyXSxcclxuICAgICAgICAgICAgICAgICAgICAgdGhpcy5tWzNdWzBdLCB0aGlzLm1bM11bMV0sIHRoaXMubVszXVsyXSkgLyBkZXQ7XHJcblxyXG5cclxuICAgIHIubVswXVszXSA9XHJcbiAgICAgIC1tYXRyRGV0ZXJtM3gzKHRoaXMubVswXVsxXSwgdGhpcy5tWzBdWzJdLCB0aGlzLm1bMF1bM10sXHJcbiAgICAgICAgICAgICAgICAgICAgIHRoaXMubVsxXVsxXSwgdGhpcy5tWzFdWzJdLCB0aGlzLm1bMV1bM10sXHJcbiAgICAgICAgICAgICAgICAgICAgIHRoaXMubVsyXVsxXSwgdGhpcy5tWzJdWzJdLCB0aGlzLm1bMl1bM10pIC8gZGV0O1xyXG5cclxuICAgIHIubVsxXVszXSA9XHJcbiAgICAgICttYXRyRGV0ZXJtM3gzKHRoaXMubVswXVswXSwgdGhpcy5tWzBdWzJdLCB0aGlzLm1bMF1bM10sXHJcbiAgICAgICAgICAgICAgICAgICAgIHRoaXMubVsxXVswXSwgdGhpcy5tWzFdWzJdLCB0aGlzLm1bMV1bM10sXHJcbiAgICAgICAgICAgICAgICAgICAgIHRoaXMubVsyXVswXSwgdGhpcy5tWzJdWzJdLCB0aGlzLm1bMl1bM10pIC8gZGV0O1xyXG5cclxuICAgIHIubVsyXVszXSA9XHJcbiAgICAgIC1tYXRyRGV0ZXJtM3gzKHRoaXMubVswXVswXSwgdGhpcy5tWzBdWzFdLCB0aGlzLm1bMF1bM10sXHJcbiAgICAgICAgICAgICAgICAgICAgIHRoaXMubVsxXVswXSwgdGhpcy5tWzFdWzFdLCB0aGlzLm1bMV1bM10sXHJcbiAgICAgICAgICAgICAgICAgICAgIHRoaXMubVsyXVswXSwgdGhpcy5tWzJdWzFdLCB0aGlzLm1bMl1bM10pIC8gZGV0O1xyXG5cclxuICAgIHIubVszXVszXSA9XHJcbiAgICAgICttYXRyRGV0ZXJtM3gzKHRoaXMubVswXVswXSwgdGhpcy5tWzBdWzFdLCB0aGlzLm1bMF1bMl0sXHJcbiAgICAgICAgICAgICAgICAgICAgIHRoaXMubVsxXVswXSwgdGhpcy5tWzFdWzFdLCB0aGlzLm1bMV1bMl0sXHJcbiAgICAgICAgICAgICAgICAgICAgIHRoaXMubVsyXVswXSwgdGhpcy5tWzJdWzFdLCB0aGlzLm1bMl1bMl0pIC8gZGV0O1xyXG5cclxuICAgIHJldHVybiByO1xyXG4gIH1cclxuXHJcbiAgc2V0SW52ZXJzZSgpIHtcclxuICAgIGxldCByID0gbWF0NCgpO1xyXG4gICAgbGV0IGRldCA9IHRoaXMuZGV0ZXJtKCk7XHJcblxyXG4gICAgaWYgKGRldCA9PSAwKVxyXG4gICAgICB0aGlzLnNldElkZW50aXR5KCk7XHJcblxyXG4gICAgLyogYnVpbGQgYWRqb2ludCBtYXRyaXggKi9cclxuICAgIHIubVswXVswXSA9XHJcbiAgICAgICttYXRyRGV0ZXJtM3gzKHRoaXMubVsxXVsxXSwgdGhpcy5tWzFdWzJdLCB0aGlzLm1bMV1bM10sXHJcbiAgICAgICAgICAgICAgICAgICAgIHRoaXMubVsyXVsxXSwgdGhpcy5tWzJdWzJdLCB0aGlzLm1bMl1bM10sXHJcbiAgICAgICAgICAgICAgICAgICAgIHRoaXMubVszXVsxXSwgdGhpcy5tWzNdWzJdLCB0aGlzLm1bM11bM10pIC8gZGV0O1xyXG5cclxuICAgIHIubVsxXVswXSA9XHJcbiAgICAgIC1tYXRyRGV0ZXJtM3gzKHRoaXMubVsxXVswXSwgdGhpcy5tWzFdWzJdLCB0aGlzLm1bMV1bM10sXHJcbiAgICAgICAgICAgICAgICAgICAgIHRoaXMubVsyXVswXSwgdGhpcy5tWzJdWzJdLCB0aGlzLm1bMl1bM10sXHJcbiAgICAgICAgICAgICAgICAgICAgIHRoaXMubVszXVswXSwgdGhpcy5tWzNdWzJdLCB0aGlzLm1bM11bM10pIC8gZGV0O1xyXG5cclxuICAgIHIubVsyXVswXSA9XHJcbiAgICAgICttYXRyRGV0ZXJtM3gzKHRoaXMubVsxXVswXSwgdGhpcy5tWzFdWzFdLCB0aGlzLm1bMV1bM10sXHJcbiAgICAgICAgICAgICAgICAgICAgIHRoaXMubVsyXVswXSwgdGhpcy5tWzJdWzFdLCB0aGlzLm1bMl1bM10sXHJcbiAgICAgICAgICAgICAgICAgICAgIHRoaXMubVszXVswXSwgdGhpcy5tWzNdWzFdLCB0aGlzLm1bM11bM10pIC8gZGV0O1xyXG5cclxuICAgIHIubVszXVswXSA9XHJcbiAgICAgIC1tYXRyRGV0ZXJtM3gzKHRoaXMubVsxXVswXSwgdGhpcy5tWzFdWzFdLCB0aGlzLm1bMV1bMl0sXHJcbiAgICAgICAgICAgICAgICAgICAgIHRoaXMubVsyXVswXSwgdGhpcy5tWzJdWzFdLCB0aGlzLm1bMl1bMl0sXHJcbiAgICAgICAgICAgICAgICAgICAgIHRoaXMubVszXVswXSwgdGhpcy5tWzNdWzFdLCB0aGlzLm1bM11bMl0pIC8gZGV0O1xyXG5cclxuICAgIHIubVswXVsxXSA9XHJcbiAgICAgIC1tYXRyRGV0ZXJtM3gzKHRoaXMubVswXVsxXSwgdGhpcy5tWzBdWzJdLCB0aGlzLm1bMF1bM10sXHJcbiAgICAgICAgICAgICAgICAgICAgIHRoaXMubVsyXVsxXSwgdGhpcy5tWzJdWzJdLCB0aGlzLm1bMl1bM10sXHJcbiAgICAgICAgICAgICAgICAgICAgIHRoaXMubVszXVsxXSwgdGhpcy5tWzNdWzJdLCB0aGlzLm1bM11bM10pIC8gZGV0O1xyXG5cclxuICAgIHIubVsxXVsxXSA9XHJcbiAgICAgICttYXRyRGV0ZXJtM3gzKHRoaXMubVswXVswXSwgdGhpcy5tWzBdWzJdLCB0aGlzLm1bMF1bM10sXHJcbiAgICAgICAgICAgICAgICAgICAgIHRoaXMubVsyXVswXSwgdGhpcy5tWzJdWzJdLCB0aGlzLm1bMl1bM10sXHJcbiAgICAgICAgICAgICAgICAgICAgIHRoaXMubVszXVswXSwgdGhpcy5tWzNdWzJdLCB0aGlzLm1bM11bM10pIC8gZGV0O1xyXG5cclxuICAgIHIubVsyXVsxXSA9XHJcbiAgICAgIC1tYXRyRGV0ZXJtM3gzKHRoaXMubVswXVswXSwgdGhpcy5tWzBdWzFdLCB0aGlzLm1bMF1bM10sXHJcbiAgICAgICAgICAgICAgICAgICAgIHRoaXMubVsyXVswXSwgdGhpcy5tWzJdWzFdLCB0aGlzLm1bMl1bM10sXHJcbiAgICAgICAgICAgICAgICAgICAgIHRoaXMubVszXVswXSwgdGhpcy5tWzNdWzFdLCB0aGlzLm1bM11bM10pIC8gZGV0O1xyXG5cclxuICAgIHIubVszXVsxXSA9XHJcbiAgICAgICttYXRyRGV0ZXJtM3gzKHRoaXMubVswXVswXSwgdGhpcy5tWzBdWzFdLCB0aGlzLm1bMF1bMl0sXHJcbiAgICAgICAgICAgICAgICAgICAgIHRoaXMubVsyXVswXSwgdGhpcy5tWzJdWzFdLCB0aGlzLm1bMl1bMl0sXHJcbiAgICAgICAgICAgICAgICAgICAgIHRoaXMubVszXVswXSwgdGhpcy5tWzNdWzFdLCB0aGlzLm1bM11bMl0pIC8gZGV0O1xyXG5cclxuXHJcbiAgICByLm1bMF1bMl0gPVxyXG4gICAgICArbWF0ckRldGVybTN4Myh0aGlzLm1bMF1bMV0sIHRoaXMubVswXVsyXSwgdGhpcy5tWzBdWzNdLFxyXG4gICAgICAgICAgICAgICAgICAgICB0aGlzLm1bMV1bMV0sIHRoaXMubVsxXVsyXSwgdGhpcy5tWzFdWzNdLFxyXG4gICAgICAgICAgICAgICAgICAgICB0aGlzLm1bM11bMV0sIHRoaXMubVszXVsyXSwgdGhpcy5tWzNdWzNdKSAvIGRldDtcclxuXHJcbiAgICByLm1bMV1bMl0gPVxyXG4gICAgICAtbWF0ckRldGVybTN4Myh0aGlzLm1bMF1bMF0sIHRoaXMubVswXVsyXSwgdGhpcy5tWzBdWzNdLFxyXG4gICAgICAgICAgICAgICAgICAgICB0aGlzLm1bMV1bMF0sIHRoaXMubVsxXVsyXSwgdGhpcy5tWzFdWzNdLFxyXG4gICAgICAgICAgICAgICAgICAgICB0aGlzLm1bM11bMF0sIHRoaXMubVszXVsyXSwgdGhpcy5tWzNdWzNdKSAvIGRldDtcclxuXHJcbiAgICByLm1bMl1bMl0gPVxyXG4gICAgICArbWF0ckRldGVybTN4Myh0aGlzLm1bMF1bMF0sIHRoaXMubVswXVsxXSwgdGhpcy5tWzBdWzNdLFxyXG4gICAgICAgICAgICAgICAgICAgICB0aGlzLm1bMV1bMF0sIHRoaXMubVsxXVsxXSwgdGhpcy5tWzFdWzNdLFxyXG4gICAgICAgICAgICAgICAgICAgICB0aGlzLm1bM11bMF0sIHRoaXMubVszXVsxXSwgdGhpcy5tWzNdWzNdKSAvIGRldDtcclxuXHJcbiAgICByLm1bM11bMl0gPVxyXG4gICAgICAtbWF0ckRldGVybTN4Myh0aGlzLm1bMF1bMF0sIHRoaXMubVswXVsxXSwgdGhpcy5tWzBdWzJdLFxyXG4gICAgICAgICAgICAgICAgICAgICB0aGlzLm1bMV1bMF0sIHRoaXMubVsxXVsxXSwgdGhpcy5tWzFdWzJdLFxyXG4gICAgICAgICAgICAgICAgICAgICB0aGlzLm1bM11bMF0sIHRoaXMubVszXVsxXSwgdGhpcy5tWzNdWzJdKSAvIGRldDtcclxuXHJcblxyXG4gICAgci5tWzBdWzNdID1cclxuICAgICAgLW1hdHJEZXRlcm0zeDModGhpcy5tWzBdWzFdLCB0aGlzLm1bMF1bMl0sIHRoaXMubVswXVszXSxcclxuICAgICAgICAgICAgICAgICAgICAgdGhpcy5tWzFdWzFdLCB0aGlzLm1bMV1bMl0sIHRoaXMubVsxXVszXSxcclxuICAgICAgICAgICAgICAgICAgICAgdGhpcy5tWzJdWzFdLCB0aGlzLm1bMl1bMl0sIHRoaXMubVsyXVszXSkgLyBkZXQ7XHJcblxyXG4gICAgci5tWzFdWzNdID1cclxuICAgICAgK21hdHJEZXRlcm0zeDModGhpcy5tWzBdWzBdLCB0aGlzLm1bMF1bMl0sIHRoaXMubVswXVszXSxcclxuICAgICAgICAgICAgICAgICAgICAgdGhpcy5tWzFdWzBdLCB0aGlzLm1bMV1bMl0sIHRoaXMubVsxXVszXSxcclxuICAgICAgICAgICAgICAgICAgICAgdGhpcy5tWzJdWzBdLCB0aGlzLm1bMl1bMl0sIHRoaXMubVsyXVszXSkgLyBkZXQ7XHJcblxyXG4gICAgci5tWzJdWzNdID1cclxuICAgICAgLW1hdHJEZXRlcm0zeDModGhpcy5tWzBdWzBdLCB0aGlzLm1bMF1bMV0sIHRoaXMubVswXVszXSxcclxuICAgICAgICAgICAgICAgICAgICAgdGhpcy5tWzFdWzBdLCB0aGlzLm1bMV1bMV0sIHRoaXMubVsxXVszXSxcclxuICAgICAgICAgICAgICAgICAgICAgdGhpcy5tWzJdWzBdLCB0aGlzLm1bMl1bMV0sIHRoaXMubVsyXVszXSkgLyBkZXQ7XHJcblxyXG4gICAgci5tWzNdWzNdID1cclxuICAgICAgK21hdHJEZXRlcm0zeDModGhpcy5tWzBdWzBdLCB0aGlzLm1bMF1bMV0sIHRoaXMubVswXVsyXSxcclxuICAgICAgICAgICAgICAgICAgICAgdGhpcy5tWzFdWzBdLCB0aGlzLm1bMV1bMV0sIHRoaXMubVsxXVsyXSxcclxuICAgICAgICAgICAgICAgICAgICAgdGhpcy5tWzJdWzBdLCB0aGlzLm1bMl1bMV0sIHRoaXMubVsyXVsyXSkgLyBkZXQ7XHJcblxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCA0OyBpKyspXHJcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgNCA7IGorKylcclxuICAgICAgICB0aGlzLm1baV1bal0gPSByLm1baV1bal07XHJcbiAgfVxyXG5cclxuICByb3RhdGUoYW5nbGUsIHYpIHtcclxuICAgIGxldCBhID0gYW5nbGUgKiBNYXRoLlBJIC8gMTgwLCBzID0gTWF0aC5zaW4oYSksIGMgPSBNYXRoLmNvcyhhKTtcclxuXHJcbiAgICByZXR1cm4gbWF0NChcclxuICAgICAgICBjICsgdi54ICogdi54ICogKDEgLSBjKSwgdi55ICogdi54ICogKDEgLSBjKSAtIHYueiAqIHMsIHYueiAqIHYueCAqICgxIC0gYykgKyB2LnkgKiBzLCAwLFxyXG4gICAgICAgIHYueCAqIHYueSAqICgxIC0gYykgKyB2LnogKiBzLCBjICsgdi55ICogdi55ICogKDEgLSBjKSwgdi56ICogdi55ICogKDEgLSBjKSAtIHYueCAqIHMsIDAsXHJcbiAgICAgICAgdi54ICogdi56ICogKDEgLSBjKSAtIHYueSAqIHMsIHYueSAqIHYueiAqICgxIC0gYykgKyB2LnggKiBzLCBjICsgdi56ICogdi56ICogKDEgLSBjKSwgMCxcclxuICAgICAgICAwLCAwLCAwLCAxKTtcclxuICB9XHJcblxyXG4gIHNldFJvdGF0ZShhbmdsZSwgdikge1xyXG4gICAgbGV0IGEgPSBhbmdsZSAqIE1hdGguUEkgLyAxODAsIHMgPSBNYXRoLnNpbihhKSwgYyA9IE1hdGguY29zKGEpO1xyXG5cclxuICAgIHRoaXMubSA9XHJcbiAgICBbXHJcbiAgICAgIFtjICsgdi54ICogdi54ICogKDEgLSBjKSwgdi55ICogdi54ICogKDEgLSBjKSAtIHYueiAqIHMsIHYueiAqIHYueCAqICgxIC0gYykgKyB2LnkgKiBzLCAwXSxcclxuICAgICAgW3YueCAqIHYueSAqICgxIC0gYykgKyB2LnogKiBzLCBjICsgdi55ICogdi55ICogKDEgLSBjKSwgdi56ICogdi55ICogKDEgLSBjKSAtIHYueCAqIHMsIDBdLFxyXG4gICAgICBbdi54ICogdi56ICogKDEgLSBjKSAtIHYueSAqIHMsIHYueSAqIHYueiAqICgxIC0gYykgKyB2LnggKiBzLCBjICsgdi56ICogdi56ICogKDEgLSBjKSwgMF0sXHJcbiAgICAgIFswLCAwLCAwLCAxXVxyXG4gICAgXTtcclxuICB9XHJcblxyXG4gIHZpZXcoTG9jLCBBdCwgVXAxKSB7XHJcbiAgICBsZXRcclxuICAgICAgRGlyID0gQXQuc3ViVmVjKExvYykubm9ybWFsaXplKCksXHJcbiAgICAgIFJpZ2h0ID0gRGlyLmNyb3NzKFVwMSkubm9ybWFsaXplKCksXHJcbiAgICAgIFVwID0gUmlnaHQuY3Jvc3MoRGlyKS5ub3JtYWxpemUoKTtcclxuICAgIFxyXG4gICAgcmV0dXJuIG1hdDQoUmlnaHQueCwgVXAueCwgLURpci54LCAwLFxyXG4gICAgICAgICAgICAgICAgIFJpZ2h0LnksIFVwLnksIC1EaXIueSwgMCxcclxuICAgICAgICAgICAgICAgICBSaWdodC56LCBVcC56LCAtRGlyLnosIDAsXHJcbiAgICAgICAgICAgICAgICAgLUxvYy5kb3QoUmlnaHQpLCAtTG9jLmRvdChVcCksIExvYy5kb3QoRGlyKSwgMSk7XHJcbiAgfVxyXG5cclxuICBzZXRWaWV3KExvYywgQXQsIFVwMSkge1xyXG4gICAgbGV0XHJcbiAgICAgIERpciA9IEF0LnN1YlZlYyhMb2MpLm5vcm1hbGl6ZSgpLFxyXG4gICAgICBSaWdodCA9IERpci5jcm9zcyhVcDEpLm5vcm1hbGl6ZSgpLFxyXG4gICAgICBVcCA9IFJpZ2h0LmNyb3NzKERpcikubm9ybWFsaXplKCk7XHJcbiAgICBcclxuICAgIHRoaXMubSA9XHJcbiAgICBbXHJcbiAgICAgIFtSaWdodC54LCBVcC54LCAtRGlyLngsIDBdLFxyXG4gICAgICBbUmlnaHQueSwgVXAueSwgLURpci55LCAwXSxcclxuICAgICAgW1JpZ2h0LnosIFVwLnosIC1EaXIueiwgMF0sXHJcbiAgICAgIFstTG9jLmRvdChSaWdodCksIC1Mb2MuZG90KFVwKSwgTG9jLmRvdChEaXIpLCAxXVxyXG4gICAgXTtcclxuICB9XHJcblxyXG4gIGZydXN0dW0obGVmdCwgcmlnaHQsIGJvdHRvbSwgdG9wLCBuZWFyLCBmYXIpIHtcclxuICAgIHJldHVybiBtYXQ0KCgyICogbmVhcikgLyAocmlnaHQgLSBsZWZ0KSwgMCwgMCwgMCxcclxuICAgICAgICAgICAgICAgICAwLCAoMiAqIG5lYXIpIC8gKHRvcCAtIGJvdHRvbSksIDAsIDAsXHJcbiAgICAgICAgICAgICAgICAgKHJpZ2h0ICsgbGVmdCkgLyAocmlnaHQgLSBsZWZ0KSwgKHRvcCArIGJvdHRvbSkgLyAodG9wIC0gYm90dG9tKSwgKC0oKGZhciArIG5lYXIpIC8gKGZhciAtIG5lYXIpKSksICgtMSksXHJcbiAgICAgICAgICAgICAgICAgMCwgMCwgKC0oKDIgKiBuZWFyICogZmFyKSAvIChmYXIgLSBuZWFyKSkpLCAwKTtcclxuICB9XHJcblxyXG4gIHNldEZydXN0dW0obGVmdCwgcmlnaHQsIGJvdHRvbSwgdG9wLCBuZWFyLCBmYXIpIHtcclxuICAgIHRoaXMubSA9XHJcbiAgICBbXHJcbiAgICAgIFsoMiAqIG5lYXIpIC8gKHJpZ2h0IC0gbGVmdCksIDAsIDAsIDBdLFxyXG4gICAgICBbMCwgKDIgKiBuZWFyKSAvICh0b3AgLSBib3R0b20pLCAwLCAwXSxcclxuICAgICAgWyhyaWdodCArIGxlZnQpIC8gKHJpZ2h0IC0gbGVmdCksICh0b3AgKyBib3R0b20pIC8gKHRvcCAtIGJvdHRvbSksICgtKChmYXIgKyBuZWFyKSAvIChmYXIgLSBuZWFyKSkpLCAoLTEpXSxcclxuICAgICAgWzAsIDAsICgtKCgyICogbmVhciAqIGZhcikgLyAoZmFyIC0gbmVhcikpKSwgMF1cclxuICAgIF07XHJcbiAgfVxyXG5cclxuICB0cmFuc3Bvc2UoKSB7XHJcbiAgICByZXR1cm4gbWF0NCh0aGlzLm1bMF1bMF0sIHRoaXMubVsxXVswXSwgdGhpcy5tWzJdWzBdLCB0aGlzLm1bM11bMF0sXHJcbiAgICAgIHRoaXMubVswXVsxXSwgdGhpcy5tWzFdWzFdLCB0aGlzLm1bMl1bMV0sIHRoaXMubVszXVsxXSxcclxuICAgICAgdGhpcy5tWzBdWzJdLCB0aGlzLm1bMV1bMl0sIHRoaXMubVsyXVsyXSwgdGhpcy5tWzNdWzJdLFxyXG4gICAgICB0aGlzLm1bMF1bM10sIHRoaXMubVsxXVszXSwgdGhpcy5tWzJdWzNdLCB0aGlzLm1bM11bM10pO1xyXG4gIH1cclxuXHJcbiAgc2V0VHJhbnNwb3NlKCkge1xyXG4gICAgdGhpcy5tID0gXHJcbiAgICBbXHJcbiAgICAgIFt0aGlzLm1bMF1bMF0sIHRoaXMubVsxXVswXSwgdGhpcy5tWzJdWzBdLCB0aGlzLm1bM11bMF1dLFxyXG4gICAgICBbdGhpcy5tWzBdWzFdLCB0aGlzLm1bMV1bMV0sIHRoaXMubVsyXVsxXSwgdGhpcy5tWzNdWzFdXSxcclxuICAgICAgW3RoaXMubVswXVsyXSwgdGhpcy5tWzFdWzJdLCB0aGlzLm1bMl1bMl0sIHRoaXMubVszXVsyXV0sXHJcbiAgICAgIFt0aGlzLm1bMF1bM10sIHRoaXMubVsxXVszXSwgdGhpcy5tWzJdWzNdLCB0aGlzLm1bM11bM11dXHJcbiAgICBdO1xyXG4gIH1cclxuXHJcbiAgcm90YXRlWChhbmdsZUluRGVncmVlKSB7XHJcbiAgICBsZXQgYSA9IGFuZ2xlSW5EZWdyZWUgKiBNYXRoLlBJIC8gMTgwLCBzaSA9IE1hdGguc2luKGEpLCBjbyA9IE1hdGguY29zKGEpO1xyXG5cclxuICAgIHJldHVybiBtYXQ0KDEsIDAsIDAsIDAsXHJcbiAgICAgICAgICAgICAgICAwLCBjbywgc2ksIDAsXHJcbiAgICAgICAgICAgICAgICAwLCAtc2ksIGNvLCAwLFxyXG4gICAgICAgICAgICAgICAgMCwgMCwgMCwgMSk7XHJcbiAgfVxyXG5cclxuICBzZXRSb3RhdGVYKGFuZ2xlSW5EZWdyZWUpIHtcclxuICAgIGxldCBhID0gYW5nbGVJbkRlZ3JlZSAqIE1hdGguUEkgLyAxODAsIHNpID0gTWF0aC5zaW4oYSksIGNvID0gTWF0aC5jb3MoYSk7XHJcblxyXG4gICAgdGhpcy5tID0gXHJcbiAgICBbXHJcbiAgICAgIFsxLCAwLCAwLCAwXSxcclxuICAgICAgWzAsIGNvLCBzaSwgMF0sXHJcbiAgICAgIFswLCAtc2ksIGNvLCAwXSxcclxuICAgICAgWzAsIDAsIDAsIDFdXHJcbiAgICBdOyAgXHJcbiAgfVxyXG5cclxuICByb3RhdGVZKGFuZ2xlSW5EZWdyZWUpIHtcclxuICAgIGxldCBhID0gYW5nbGVJbkRlZ3JlZSAqIE1hdGguUEkgLyAxODAsIHNpID0gTWF0aC5zaW4oYSksIGNvID0gTWF0aC5jb3MoYSk7XHJcblxyXG4gICAgcmV0dXJuIG1hdDQoY28sIDAsIC1zaSwgMCxcclxuICAgICAgICAgICAgICAgIDAsIDEsIDAsIDAsXHJcbiAgICAgICAgICAgICAgICBzaSwgMCwgY28sIDAsXHJcbiAgICAgICAgICAgICAgICAwLCAwLCAwLCAxKTtcclxuICB9XHJcblxyXG4gIHNldFJvdGF0ZVkoYW5nbGVJbkRlZ3JlZSkge1xyXG4gICAgbGV0IGEgPSBhbmdsZUluRGVncmVlICogTWF0aC5QSSAvIDE4MCwgc2kgPSBNYXRoLnNpbihhKSwgY28gPSBNYXRoLmNvcyhhKTtcclxuXHJcbiAgICB0aGlzLm0gPSBcclxuICAgIFtcclxuICAgICAgW2NvLCAwLCAtc2ksIDBdLFxyXG4gICAgICBbMCwgMSwgMCwgMF0sXHJcbiAgICAgIFtzaSwgMCwgY28sIDBdLFxyXG4gICAgICBbMCwgMCwgMCwgMV1cclxuICAgIF07XHJcbiAgfVxyXG5cclxuICByb3RhdGVaKGFuZ2xlSW5EZWdyZWUpIHtcclxuICAgIGxldCBhID0gYW5nbGVJbkRlZ3JlZSAqIE1hdGguUEkgLyAxODAsIHNpID0gTWF0aC5zaW4oYSksIGNvID0gTWF0aC5jb3MoYSk7XHJcblxyXG4gICAgcmV0dXJuIG1hdDQoY28sIHNpLCAwLCAwLFxyXG4gICAgICAgICAgICAgICAgLXNpLCBjbywgMCwgMCxcclxuICAgICAgICAgICAgICAgIDAsIDAsIDEsIDAsXHJcbiAgICAgICAgICAgICAgICAwLCAwLCAwLCAxKTtcclxuICB9XHJcblxyXG4gIHNldFJvdGF0ZVooYW5nbGVJbkRlZ3JlZSlcclxuICB7XHJcbiAgICBsZXQgYSA9IGFuZ2xlSW5EZWdyZWUgKiBNYXRoLlBJIC8gMTgwLCBzaSA9IE1hdGguc2luKGEpLCBjbyA9IE1hdGguY29zKGEpO1xyXG5cclxuICAgIHRoaXMubSA9IFxyXG4gICAgW1xyXG4gICAgICBbY28sIHNpLCAwLCAwXSxcclxuICAgICAgWy1zaSwgY28sIDAsIDBdLFxyXG4gICAgICBbMCwgMCwgMSwgMF0sXHJcbiAgICAgIFswLCAwLCAwLCAxXVxyXG4gICAgXTtcclxuICB9XHJcblxyXG4gIHNjYWxlKHYpIHtcclxuICAgIHJldHVybiBtYXQ0KHYueCwgMCwgMCwgMCxcclxuICAgICAgICAgICAgICAgIDAsIHYueSwgMCwgMCxcclxuICAgICAgICAgICAgICAgIDAsIDAsIHYueiwgMCxcclxuICAgICAgICAgICAgICAgIDAsIDAsIDAsIDEpO1xyXG4gIH1cclxuXHJcbiAgc2V0U2NhbGUodikge1xyXG4gICAgdGhpcy5tID1cclxuICAgIFtcclxuICAgICAgW3YueCwgMCwgMCwgMF0sXHJcbiAgICAgIFswLCB2LnksIDAsIDBdLFxyXG4gICAgICBbMCwgMCwgdi56LCAwXSxcclxuICAgICAgWzAsIDAsIDAsIDFdXHJcbiAgICBdO1xyXG4gIH1cclxuXHJcbiAgb3J0aG8obGVmdCwgcmlnaHQsIGJvdHRvbSwgdG9wLCBuZWFyLCBmYXIpXHJcbiAge1xyXG4gICAgcmV0dXJuIG1hdDQoMiAvIChyaWdodCAtIGxlZnQpLCAwLCAwLCAwLFxyXG4gICAgICAgICAgICAgICAgMCwgMiAvICh0b3AgLSBib3R0b20pLCAwLCAwLFxyXG4gICAgICAgICAgICAgICAgMCwgMCwgLTIgLyAoZmFyIC0gbmVhciksIDAsXHJcbiAgICAgICAgICAgICAgICAtKHJpZ2h0ICsgbGVmdCkgLyAocmlnaHQgLSBsZWZ0KSwgLSh0b3AgKyBib3R0b20pIC8gKHRvcCAtIGJvdHRvbSksIC0oZmFyICsgbmVhcikgLyAoZmFyIC0gbmVhciksIDEpO1xyXG4gIH1cclxuXHJcbiAgc2V0T3J0aG8obGVmdCwgcmlnaHQsIGJvdHRvbSwgdG9wLCBuZWFyLCBmYXIpXHJcbiAge1xyXG4gICAgdGhpcy5tID1cclxuICAgIFtcclxuICAgICAgWzIgLyAocmlnaHQgLSBsZWZ0KSwgMCwgMCwgMF0sXHJcbiAgICAgIFswLCAyIC8gKHRvcCAtIGJvdHRvbSksIDAsIDBdLFxyXG4gICAgICBbMCwgMCwgLTIgLyAoZmFyIC0gbmVhciksIDBdLFxyXG4gICAgICBbLShyaWdodCArIGxlZnQpIC8gKHJpZ2h0IC0gbGVmdCksIC0odG9wICsgYm90dG9tKSAvICh0b3AgLSBib3R0b20pLCAtKGZhciArIG5lYXIpIC8gKGZhciAtIG5lYXIpLCAxXVxyXG4gICAgXTtcclxuICB9XHJcblxyXG4gIHRvQXJyYXkoKSB7XHJcbiAgICByZXR1cm4gW10uY29uY2F0KC4uLnRoaXMubSk7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gbWF0NCguLi5hcmdzKSB7XHJcbiAgcmV0dXJuIG5ldyBfbWF0NCguLi5hcmdzKTtcclxufVxyXG5cclxuZnVuY3Rpb24gbWF0ckRldGVybTN4MyhhMTEsIGExMiwgYTEzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgIGEyMSwgYTIyLCBhMjMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgYTMxLCBhMzIsIGEzMykge1xyXG4gIHJldHVybiBhMTEgKiBhMjIgKiBhMzMgKyBhMTIgKiBhMjMgKiBhMzEgKyBhMTMgKiBhMjEgKiBhMzIgLVxyXG4gICAgICAgICBhMTEgKiBhMjMgKiBhMzIgLSBhMTIgKiBhMjEgKiBhMzMgLSBhMTMgKiBhMjIgKiBhMzE7XHJcbn1cclxuIiwiY2xhc3MgX3ZlYzMge1xyXG4gIHg7XHJcbiAgeTtcclxuICB6O1xyXG5cclxuICBjb25zdHJ1Y3RvciguLi5hcmdzKSB7IFxyXG4gICAgaWYgKGFyZ3MubGVuZ3RoID09PSAzKVxyXG4gICAgICB0aGlzLnggPSBhcmdzWzBdLCB0aGlzLnkgPSBhcmdzWzFdLCB0aGlzLnogPSBhcmdzWzJdO1xyXG4gICAgZWxzZSBpZiAodHlwZW9mIGFyZ3NbMF0gPT0gXCJvYmplY3RcIikge1xyXG4gICAgICB0aGlzLnggPSBhcmdzWzBdLngsIHRoaXMueSA9IGFyZ3NbMF0ueSwgdGhpcy56ID0gYXJnc1swXS56OyBcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMueCA9IGFyZ3NbMF0sIHRoaXMueSA9IGFyZ3NbMF0sIHRoaXMueiA9IGFyZ3NbMF07IFxyXG4gICAgfVxyXG4gIH0gLy8gRW5kIG9mICdjb25zdHJ1Y3RvcicgZnVuY3Rpb25cclxuXHJcbiAgLy8gVmVjdG9yIG11bHRpcGx1ZSBieSBudW1iZXIgZnVuY3Rpb25cclxuICBtdWxOdW0obnVtKSB7XHJcbiAgICByZXR1cm4gdmVjMyh0aGlzLnggKiBudW0sIHRoaXMueSAqIG51bSwgdGhpcy56ICogbnVtKTtcclxuICB9IC8vIEVuZCBvZiAnbXVsTnVtJyBmdW5jdGlvblxyXG5cclxuICAvLyBWZWN0b3IgZGl2aWRlIGJ5IG51bWJlciBmdW5jdGlvblxyXG4gIGRpdk51bShudW0pIHtcclxuICAgIHJldHVybiB2ZWMzKHRoaXMueCAvIG51bSwgdGhpcy55IC8gbnVtLCB0aGlzLnogLyBudW0pO1xyXG4gIH0gLy8gRW5kIG9mICdkdXZOdW0nIGZ1bmN0aW9uXHJcblxyXG4gIC8vIFZlY3RvciBhZGQgbnVtYmVyIGZ1bmN0aW9uXHJcbiAgYWRkTnVtKG51bSkge1xyXG4gICAgcmV0dXJuIHZlYzModGhpcy54ICsgbnVtLCB0aGlzLnkgKyBudW0sIHRoaXMueiArIG51bSk7XHJcbiAgfSAvLyBFbmQgb2YgJ2FkZE51bScgZnVuY3Rpb25cclxuXHJcbiAgLy8gVmVjdG9yIHN1YnN0cmFjdCBudW1iZXIgZnVuY3Rpb25cclxuICBzdWJOdW0obnVtKSB7XHJcbiAgICByZXR1cm4gdmVjMyh0aGlzLnggLSBudW0sIHRoaXMueSAtIG51bSwgdGhpcy56IC0gbnVtKTtcclxuICB9IC8vIEVuZCBvZiAnc3ViTnVtJyBmdW5jdGlvblxyXG5cclxuICAvLyBWZWN0b3IgYWRkIHZlY3RvciBmdW5jdGlvblxyXG4gIGFkZFZlYyh2ZWMpIHtcclxuICAgIHJldHVybiB2ZWMzKHRoaXMueCArIHZlYy54LCB0aGlzLnkgKyB2ZWMueSwgdGhpcy56ICsgdmVjLnopO1xyXG4gIH0gLy8gRW5kIG9mICdhZGRWZWMnIGZ1bmN0aW9uXHJcblxyXG4gIC8vIFZlY3RvciBzdWJzdHJhY3QgdmVjdG9yIGZ1bmN0aW9uXHJcbiAgc3ViVmVjKHZlYykge1xyXG4gICAgcmV0dXJuIHZlYzModGhpcy54IC0gdmVjLngsIHRoaXMueSAtIHZlYy55LCB0aGlzLnogLSB2ZWMueik7XHJcbiAgfSAvLyBFbmQgb2YgJ3N1YlZlYycgZnVuY3Rpb25cclxuXHJcbiAgLy8gTWFrZSB2ZWN0b3IgbmVnYXRpdmUgdmVjdG9yXHJcbiAgbmVnKHZlYykge1xyXG4gICAgcmV0dXJuIHZlYzMoLXRoaXMueCwgLXRoaXMueSwgLXRoaXMueik7XHJcbiAgfSAvLyBFbmQgb2YgJ25lZycgZnVuY3Rpb25cclxuXHJcbiAgLy8gVmVjdG9yIGRvdCBwcm9kdWN0IGZ1bmN0aW9uXHJcbiAgZG90KHZlYykge1xyXG4gICAgcmV0dXJuIHRoaXMueCAqIHZlYy54ICsgdGhpcy55ICogdmVjLnkgKyB0aGlzLnogKiB2ZWMuejtcclxuICB9IC8vIEVuZCBvZiAnZG90JyBmdW5jdGlvblxyXG5cclxuICAvLyBWZWN0b3IgY3Jvc3MgcHJvZHVjdCBmdW5jdGlvblxyXG4gIGNyb3NzKHZlYykge1xyXG4gICAgcmV0dXJuIHZlYzMoXHJcbiAgICAgIHRoaXMueSAqIHZlYy56IC0gdGhpcy56ICogdmVjLnksXHJcbiAgICAgIHRoaXMueiAqIHZlYy54IC0gdGhpcy54ICogdmVjLnosXHJcbiAgICAgIHRoaXMueCAqIHZlYy55IC0gdGhpcy55ICogdmVjLngpO1xyXG4gIH0gLy8gRW5kIG9mICdjcm9zcycgZnVuY3Rpb25cclxuICBcclxuICAvLyBWZWN0b3IgbGVuZ2h0IGV2YXVsYXRpbmcgZnVuY3Rpb25cclxuICBsZW4oKSB7XHJcbiAgICBsZXQgbGVuID0gdGhpcy5kb3QodGhpcyk7XHJcblxyXG4gICAgaWYgKGxlbiA9PSAwIHx8IGxlbiA9PSAxKVxyXG4gICAgICByZXR1cm4gbGVuO1xyXG5cclxuICAgIHJldHVybiBNYXRoLnNxcnQobGVuKTtcclxuICB9IC8vIEVuZCBvZiAnbGVuJyBmdW5jdGlvblxyXG5cclxuICAvLyBTcXVhcmUgb2YgdmVjdG9yIGxlbmdodCBldmF1bGF0aW5nIGZ1bmN0aW9uXHJcbiAgbGVuMigpIHtcclxuICAgIHJldHVybiB0aGlzLmRvdCh0aGlzKTtcclxuICB9IC8vIEVuZCBvZiAnbGVuMicgZnVuY3Rpb25cclxuXHJcbiAgLy8gVmVjdG9yIG5vcm1hbGl6aW5nIGZ1bmN0aW9uXHJcbiAgbm9ybWFsaXplKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuZGl2TnVtKHRoaXMubGVuKCkpO1xyXG4gIH0gLy8gRW5kIG9mICdub3JtYWxpemUnIGZ1bmN0aW9uXHJcblxyXG4gIC8vIFZlY3RvciBzZXR0aW5nIG5vcm1hbGl6ZSBmdW5jdGlvblxyXG4gIHNldE5vcm1hbGl6ZSgpIHtcclxuICAgIGxldCBsID0gdGhpcy5sZW4oKTtcclxuXHJcbiAgICB0aGlzLnggLz0gbDtcclxuICAgIHRoaXMueSAvPSBsO1xyXG4gICAgdGhpcy56IC89IGw7XHJcbiAgfSAvLyBFbmQgb2YgJ25vcm1hbGl6ZScgZnVuY3Rpb25cclxuXHJcbiAgLy8gVmVjdG9yIHRyYW5zZm9ybSBieSBtYXRyaXggZnVuY3Rpb25cclxuICB2ZWN0b3JUcmFuc2Zvcm0oYSlcclxuICB7XHJcbiAgICByZXR1cm4gdmVjMyh0aGlzLnggKiBhLm1bMF1bMF0gKyB0aGlzLnkgKiBhLm1bMV1bMF0gKyB0aGlzLnogKiBhLm1bMl1bMF0sXHJcbiAgICAgICAgICAgICAgICB0aGlzLnggKiBhLm1bMF1bMV0gKyB0aGlzLnkgKiBhLm1bMV1bMV0gKyB0aGlzLnogKiBhLm1bMl1bMV0sXHJcbiAgICAgICAgICAgICAgICB0aGlzLnggKiBhLm1bMF1bMl0gKyB0aGlzLnkgKiBhLm1bMV1bMl0gKyB0aGlzLnogKiBhLm1bMl1bMl0pO1xyXG4gIH0gLy8gRW5kIG9mICd2ZWN0b3JUcmFuc2Zvcm0nIGZ1bmN0aW9uXHJcblxyXG4gIC8vIFZlY3RvciBtdWx0aXBsdWUgYnkgbWF0cml4IGZ1bmN0aW9uXHJcbiAgbXVsTWF0cihtKVxyXG4gIHtcclxuICAgIGxldCB3ID0gdGhpcy54ICogYS5tWzBdWzNdICsgdGhpcy55ICogYS5tWzFdWzNdICsgdGhpcy56ICogYS5tWzJdWzNdICsgYS5tWzNdWzNdO1xyXG4gIFxyXG4gICAgcmV0dXJuIHZlYzMoKHRoaXMueCAqIGEubVswXVswXSArIHRoaXMueSAqIGEubVsxXVswXSArIHRoaXMueiAqIGEubVsyXVswXSArIGEubVszXVswXSkgLyB3LFxyXG4gICAgICAgICAgICAgICAgICAodGhpcy54ICogYS5tWzBdWzFdICsgdGhpcy55ICogYS5tWzFdWzFdICsgdGhpcy56ICogYS5tWzJdWzFdICsgYS5tWzNdWzFdKSAvIHcsXHJcbiAgICAgICAgICAgICAgICAgICh0aGlzLnggKiBhLm1bMF1bMl0gKyB0aGlzLnkgKiBhLm1bMV1bMl0gKyB0aGlzLnogKiBhLm1bMl1bMl0gKyBhLm1bM11bMl0pIC8gdyk7XHJcbiAgfSAvLyBFbmQgb2YgJ211bE1hdHInIGZ1bmN0aW9uXHJcblxyXG4gIHBvaW50VHJhbnNmb3JtKG0pXHJcbiAge1xyXG4gICAgcmV0dXJuIHZlYzModGhpcy54ICogYS5tWzBdWzBdICsgdGhpcy55ICogYS5tWzFdWzBdICsgdGhpcy56ICogYS5tWzJdWzBdICsgYS5tWzNdWzBdLFxyXG4gICAgICAgICAgICAgIHRoaXMueCAqIGEubVswXVsxXSArIHRoaXMueSAqIGEubVsxXVsxXSArIHRoaXMueiAqIGEubVsyXVsxXSArIGEubVszXVsxXSxcclxuICAgICAgICAgICAgICB0aGlzLnggKiBhLm1bMF1bMl0gKyB0aGlzLnkgKiBhLm1bMV1bMl0gKyB0aGlzLnogKiBhLm1bMl1bMl0gKyBhLm1bM11bMl0pO1xyXG4gIH0gLy8gRW5kIG9mICdwb2ludFRyYW5zZm9ybScgZnVuY3Rpb25cclxufVxyXG5cclxuLy8gVmVjdG9yIHNldHRpbmcgZnVuY3Rpb25cclxuZXhwb3J0IGZ1bmN0aW9uIHZlYzMoLi4uYXJncykge1xyXG4gIHJldHVybiBuZXcgX3ZlYzMoLi4uYXJncyk7XHJcbn0gLy8gRW5kIG9mICd2ZWMzJyBmdW5jdGlvblxyXG4iLCJpbXBvcnQgeyBtYXQ0IH0gZnJvbSBcIi4uL21hdGgvbWF0NC5qc1wiXHJcbmltcG9ydCB7IHZlYzMgfSBmcm9tIFwiLi4vbWF0aC92ZWMzLmpzXCJcclxuXHJcbmNsYXNzIF9jYW1lcmEge1xyXG4gIGxvYzsgICAvKiBDYW1lcmEgbG9jYXRpb24gKi9cclxuICBhdDsgICAgLyogQ2FtZXJhIGxvb2stYXQgcG9pbnQgKi9cclxuICBkaXI7ICAgLyogQ2FtZXJhIGRpcmVjdGlvbiAqL1xyXG4gIHJpZ2h0OyAvKiBDYW1lcmEgcmlnaHQgZGlyZWN0aW9uICovXHJcbiAgdXA7ICAgIC8qIENhbWVyYSB1cCBkaXJlY3Rpb24gKi9cclxuXHJcbiAgbWF0clZpZXc7IC8qIFZpZXcgbWF0cml4ICovXHJcbiAgbWF0clByb2o7IC8qIFByb2plY3Rpb24gbWF0cml4ICovXHJcbiAgbWF0clZQOyAgIC8qIFN0b3JlZCAoVmlldyAqIFByb2opIG1hdHJpeCAqL1xyXG5cclxuICBmcmFtZVc7IC8qIEZyYW1lIHdpZHRoIChpbiBwaXhlbHMpICovXHJcbiAgZnJhbWVIOyAvKiBGcmFtZSBoZWlnaHQgKGluIHBpeGVscykgKi9cclxuXHJcbiAgd3A7ICAgICAgICAgIC8qIFByb2plY3QgcGxhbmUgc2l6ZSAod2lkdGgpICovXHJcbiAgaHA7ICAgICAgICAgIC8qIFByb2plY3QgcGxhbmUgc2l6ZSAoaGVpZ2h0KSAqL1xyXG4gIHByb2pTaXplOyAgICAvKiBQcm9qZWN0IHBsYW5lIGZpdCBzcXVhcmUgKi9cclxuICBwcm9qRGlzdDsgICAgLyogRGlzdGFuY2UgdG8gcHJvamVjdCBwbGFuZSBmcm9tIHZpZXdlciAobmVhcikgKi9cclxuICBwcm9qRmFyQ2xpcDsgLyogRGlzdGFuY2UgdG8gcHJvamVjdCBmb3IgY2xpcCBwbGFuZSAoZmFyKSAqL1xyXG5cclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHRoaXMubWF0clByb2ogPSBtYXQ0KCk7XHJcbiAgICB0aGlzLm1hdHJWaWV3ID0gbWF0NCgpO1xyXG4gICAgdGhpcy5tYXRyVlAgPSBtYXQ0KCk7XHJcblxyXG4gICAgdGhpcy5mcmFtZUggPSAxMDAwO1xyXG4gICAgdGhpcy5mcmFtZVcgPSAxMDAwO1xyXG5cclxuICAgIHRoaXMucHJvakRpc3QgPSAwLjEwO1xyXG4gICAgdGhpcy5wcm9qRmFyQ2xpcCA9IDMwMDtcclxuICAgIHRoaXMucHJvalNpemUgPSAwLjE7XHJcbiAgfVxyXG4gIHNldChsb2MsIGF0LCB1cClcclxuICB7XHJcbiAgICB0aGlzLm1hdHJWaWV3LnNldFZpZXcobG9jLCBhdCwgdXApO1xyXG5cclxuICAgIHRoaXMucmlnaHQgPSB2ZWMzKHRoaXMubWF0clZpZXcubVswXVswXSxcclxuICAgICAgICAgICAgICAgICAgICAgIHRoaXMubWF0clZpZXcubVsxXVswXSxcclxuICAgICAgICAgICAgICAgICAgICAgIHRoaXMubWF0clZpZXcubVsyXVswXSk7XHJcbiAgICB0aGlzLnVwID0gdmVjMyh0aGlzLm1hdHJWaWV3Lm1bMF1bMV0sXHJcbiAgICAgICAgICAgICAgICAgICB0aGlzLm1hdHJWaWV3Lm1bMV1bMV0sXHJcbiAgICAgICAgICAgICAgICAgICB0aGlzLm1hdHJWaWV3Lm1bMl1bMV0pO1xyXG4gICAgdGhpcy5kaXIgPSB2ZWMzKC10aGlzLm1hdHJWaWV3Lm1bMF1bMl0sXHJcbiAgICAgICAgICAgICAgICAgICAgLXRoaXMubWF0clZpZXcubVsxXVsyXSxcclxuICAgICAgICAgICAgICAgICAgICAtdGhpcy5tYXRyVmlldy5tWzJdWzJdKTtcclxuICAgIHRoaXMubG9jID0gdmVjMyhsb2MpO1xyXG4gICAgdGhpcy5hdCA9IHZlYzMoYXQpO1xyXG5cclxuICAgIHRoaXMubWF0clZQID0gdGhpcy5tYXRyVmlldy5tdWxNYXRyKHRoaXMubWF0clByb2opO1xyXG4gIH0gLy8gRW5kIG9mICdzZXQnIGZ1bmN0aW9uXHJcblxyXG4gIHNldFByb2oocHJvalNpemUsIHByb2pEaXN0LCBwcm9qRmFyQ2xpcClcclxuICB7XHJcbiAgICBsZXQgcngsIHJ5O1xyXG5cclxuICAgIHRoaXMucHJvakRpc3QgPSBwcm9qRGlzdDtcclxuICAgIHRoaXMucHJvakZhckNsaXAgPSBwcm9qRmFyQ2xpcDtcclxuICAgIHJ4ID0gcnkgPSB0aGlzLnByb2pTaXplID0gcHJvalNpemU7XHJcblxyXG4gICAgLyogQ29ycmVjdCBhc3BlY3QgcmF0aW8gKi9cclxuICAgIGlmICh0aGlzLmZyYW1lVyA+PSB0aGlzLmZyYW1lSClcclxuICAgICAgcnggKj0gdGhpcy5mcmFtZVcgLyB0aGlzLmZyYW1lSDtcclxuICAgIGVsc2VcclxuICAgICAgcnkgKj0gdGhpcy5mcmFtZUggLyB0aGlzLmZyYW1lVztcclxuXHJcbiAgICB0aGlzLndwID0gcng7XHJcbiAgICB0aGlzLmhwID0gcnk7XHJcbiAgICB0aGlzLm1hdHJQcm9qLnNldEZydXN0dW0oLXJ4IC8gMiwgcnggLyAyLCAtcnkgLyAyLCByeSAvIDIsIHRoaXMucHJvakRpc3QsIHRoaXMucHJvakZhckNsaXApO1xyXG4gICAgdGhpcy5tYXRyVlAgPSB0aGlzLm1hdHJWaWV3Lm11bE1hdHIodGhpcy5tYXRyUHJvaik7XHJcbiAgfSAvLyBFbmQgb2YgJ3NldFByb2onIGZ1bmN0aW9uXHJcblxyXG4gIHNldFNpemUoZnJhbWVXLCBmcmFtZUgpXHJcbiAge1xyXG4gICAgdGhpcy5mcmFtZVcgPSBmcmFtZVc7XHJcbiAgICB0aGlzLmZyYW1lSCA9IGZyYW1lSDtcclxuICAgIHRoaXMuc2V0UHJvaih0aGlzLnByb2pTaXplLCB0aGlzLnByb2pEaXN0LCB0aGlzLnByb2pGYXJDbGlwKTtcclxuICB9IC8vIEVuZCBvZiAnc2V0U2l6ZScgZnVuY3Rpb25cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGNhbWVyYSgpe1xyXG4gIHJldHVybiBuZXcgX2NhbWVyYSgpO1xyXG59IiwiaW1wb3J0IHsgY2FtZXJhIH0gZnJvbSBcIi4uL21hdGgvY2FtZXJhLmpzXCI7XHJcbmltcG9ydCB7IG1hdDQgfSBmcm9tIFwiLi4vbWF0aC9tYXQ0LmpzXCI7XHJcbmltcG9ydCB7IHZlYzMgfSBmcm9tIFwiLi4vbWF0aC92ZWMzLmpzXCI7XHJcblxyXG5jbGFzcyBfcmVuZGVyT2JqZWN0IHtcclxuICBnbDtcclxuICBjYW52YXM7XHJcbiAgbWFpbkNhbTtcclxuICBzdGFydFRpbWU7XHJcbiAgdGltZTtcclxuXHJcbiAgcHJpbUxpc3QgPSBbXTtcclxuICBcclxuICBjb25zdHJ1Y3RvciAoY2FudmFzSWQpIHtcclxuICAgIHRoaXMuaW5pdChjYW52YXNJZClcclxuICB9XHJcblxyXG4gIGluaXQgKGNhbnZhc0lkKSB7XHJcbiAgICB0aGlzLmNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGNhbnZhc0lkKTtcclxuICAgIHRoaXMuZ2wgPSB0aGlzLmNhbnZhcy5nZXRDb250ZXh0KFwid2ViZ2wyXCIpO1xyXG4gICAgdGhpcy5tYWluQ2FtID0gY2FtZXJhKCk7XHJcblxyXG4gICAgdGhpcy5nbC5lbmFibGUodGhpcy5nbC5ERVBUSF9URVNUKTtcclxuICAgIGNvbnN0IGRhdGUgPSBuZXcgRGF0ZSgpO1xyXG4gICAgdGhpcy50aW1lID0gdGhpcy5zdGFydFRpbWUgPSBkYXRlLmdldE1pbnV0ZXMoKSAqIDYwICtcclxuICAgICAgICAgICAgZGF0ZS5nZXRTZWNvbmRzKCkgK1xyXG4gICAgICAgICAgICBkYXRlLmdldE1pbGxpc2Vjb25kcygpIC8gMTAwMDtcclxuXHJcbiAgICB0aGlzLmdsLmNsZWFyQ29sb3IoMC4zMCwgMC40NywgMC44LCAxKTtcclxuXHJcbiAgfVxyXG5cclxuICBkcmF3RnJhbWUoKSB7XHJcbiAgICBjb25zdCBkYXRlID0gbmV3IERhdGUoKTtcclxuICAgIHRoaXMudGltZSA9IGRhdGUuZ2V0TWludXRlcygpICogNjAgK1xyXG4gICAgICAgICAgICBkYXRlLmdldFNlY29uZHMoKSArXHJcbiAgICAgICAgICAgIGRhdGUuZ2V0TWlsbGlzZWNvbmRzKCkgLyAxMDAwIC0gdGhpcy5zdGFydFRpbWU7XHJcblxyXG4gICAgdGhpcy5nbC5jbGVhcih0aGlzLmdsLkNPTE9SX0JVRkZFUl9CSVQpO1xyXG4gIH1cclxuXHJcbiAgZHJhd1ByaW0ocCkge1xyXG4gICAgcC5wcmltTXRsUHRuLnNoZC5hcHBseSgpO1xyXG5cclxuICAgIC8vbGV0IG1XID0gbWF0NCgpLnJvdGF0ZVkoNDcgKiB0aGlzLnRpbWUpO1xyXG4gICAgbGV0IG1XID0gbWF0NCgpLnJvdGF0ZSg0NyAqIHRoaXMudGltZSwgdmVjMygxLCAxLCAxKS5ub3JtYWxpemUoKSk7XHJcbiAgICBsZXQgbVdWUCA9IG1XLm11bE1hdHIodGhpcy5tYWluQ2FtLm1hdHJWUCk7XHJcbiAgICBsZXQgbVdJbnYgPSBtVy5pbnZlcnNlKCkudHJhbnNwb3NlKCk7XHJcblxyXG4gICAgaWYgKHAucHJpbU10bFB0bi5zaGQudW5pZm9ybXNbXCJNYXRyV1ZQXCJdICE9IHVuZGVmaW5lZClcclxuICAgICAgdGhpcy5nbC51bmlmb3JtTWF0cml4NGZ2KHAucHJpbU10bFB0bi5zaGQudW5pZm9ybXNbXCJNYXRyV1ZQXCJdLmxvYywgZmFsc2UsIG5ldyBGbG9hdDMyQXJyYXkobVdWUC50b0FycmF5KCkpKTtcclxuICAgIGlmIChwLnByaW1NdGxQdG4uc2hkLnVuaWZvcm1zW1wiTWF0cldcIl0gIT0gdW5kZWZpbmVkKSBcclxuICAgICAgdGhpcy5nbC51bmlmb3JtTWF0cml4NGZ2KHAucHJpbU10bFB0bi5zaGQudW5pZm9ybXNbXCJNYXRyV1wiXS5sb2MsIGZhbHNlLCBuZXcgRmxvYXQzMkFycmF5KG1XLnRvQXJyYXkoKSkpO1xyXG4gICAgaWYgKHAucHJpbU10bFB0bi5zaGQudW5pZm9ybXNbXCJNYXRyV0ludlwiXSAhPSB1bmRlZmluZWQpXHJcbiAgICAgIHRoaXMuZ2wudW5pZm9ybU1hdHJpeDRmdihwLnByaW1NdGxQdG4uc2hkLnVuaWZvcm1zW1wiTWF0cldJbnZcIl0ubG9jLCBmYWxzZSwgbmV3IEZsb2F0MzJBcnJheShtV0ludi50b0FycmF5KCkpKTtcclxuICAgIGlmIChwLnByaW1NdGxQdG4uc2hkLnVuaWZvcm1zW1wiVGltZVwiXSAhPSB1bmRlZmluZWQpXHJcbiAgICAgIHRoaXMuZ2wudW5pZm9ybTFmKHAucHJpbU10bFB0bi5zaGQudW5pZm9ybXNbXCJUaW1lXCJdLmxvYywgdGhpcy50aW1lKTtcclxuXHJcbiAgICB0aGlzLmdsLmJpbmRWZXJ0ZXhBcnJheShwLnZlcnRleEFycmF5KTtcclxuICAgIHRoaXMuZ2wuYmluZEJ1ZmZlcih0aGlzLmdsLkFSUkFZX0JVRkZFUiwgcC52ZXJ0ZXhCdWZmZXIpO1xyXG4gICAgaWYgKHAuaW5kZXhCdWZmZXIgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHRoaXMuZ2wuYmluZEJ1ZmZlcih0aGlzLmdsLkVMRU1FTlRfQVJSQVlfQlVGRkVSLCBwLmluZGV4QnVmZmVyKTtcclxuXHJcbiAgICAgIHRoaXMuZ2wuZHJhd0VsZW1lbnRzKHAudHlwZSwgcC5ub29mSSwgdGhpcy5nbC5VTlNJR05FRF9JTlQsIDApO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5nbC5kcmF3QXJyYXlzKHAudHlwZSwgMCwgcC5ub29mVik7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gcmVuZGVyT2JqZWN0KGNhbnZhc0lkKSB7XHJcbiAgcmV0dXJuIG5ldyBfcmVuZGVyT2JqZWN0KGNhbnZhc0lkKTtcclxufSIsIi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuY2xhc3MgX3NoYWRlciB7XHJcbiAgZ2xEcmF3aW5nQ29udGV4dDtcclxuICBuYW1lO1xyXG5cclxuICBhc3luYyBjcmVhdGUoKSB7XHJcbiAgICB0aGlzLmlkID0gbnVsbDtcclxuICAgIHRoaXMuc2hhZGVycyA9XHJcbiAgICBbXHJcbiAgICAgICB7XHJcbiAgICAgICAgIGlkOiBudWxsLFxyXG4gICAgICAgICB0eXBlOiB0aGlzLmdsRHJhd2luZ0NvbnRleHQuVkVSVEVYX1NIQURFUixcclxuICAgICAgICAgbmFtZTogXCJ2ZXJ0XCIsXHJcbiAgICAgICAgIHNyYzogXCJcIixcclxuICAgICAgIH0sXHJcbiAgICAgICB7XHJcbiAgICAgICAgaWQ6IG51bGwsXHJcbiAgICAgICAgdHlwZTogdGhpcy5nbERyYXdpbmdDb250ZXh0LkZSQUdNRU5UX1NIQURFUixcclxuICAgICAgICBuYW1lOiBcImZyYWdcIixcclxuICAgICAgICBzcmM6IFwiXCIsXHJcbiAgICAgICB9XHJcbiAgICBdO1xyXG4gICAgZm9yIChjb25zdCBzIG9mIHRoaXMuc2hhZGVycykge1xyXG4gICAgICBsZXQgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChgYmluL3NoYWRlcnMvJHt0aGlzLm5hbWV9LyR7cy5uYW1lfS5nbHNsYCk7XHJcbiAgICAgIGxldCBzcmMgPSBhd2FpdCByZXNwb25zZS50ZXh0KCk7XHJcbiAgICAgIGlmICh0eXBlb2Ygc3JjID09IFwic3RyaW5nXCIgJiYgc3JjICE9IFwiXCIpXHJcbiAgICAgICAgcy5zcmMgPSBzcmM7XHJcbiAgICB9XHJcbiAgICAvLyByZWNvbXBpbGUgc2hhZGVyc1xyXG4gICAgdGhpcy51cGRhdGVTaGFkZXJzU291cmNlKCk7XHJcbiB9ICBcclxuXHJcbiAgdXBkYXRlU2hhZGVyc1NvdXJjZSgpIHsgXHJcbiAgICB0aGlzLnNoYWRlcnNbMF0uaWQgPSBudWxsO1xyXG4gICAgdGhpcy5zaGFkZXJzWzFdLmlkID0gbnVsbDtcclxuICAgIHRoaXMuaWQgPSBudWxsO1xyXG4gICAgaWYgKHRoaXMuc2hhZGVyc1swXS5zcmMgPT0gXCJcIiB8fCB0aGlzLnNoYWRlcnNbMV0uc3JjID09IFwiXCIpXHJcbiAgICAgIHJldHVybjtcclxuICAgIHRoaXMuc2hhZGVycy5mb3JFYWNoKHMgPT4ge1xyXG4gICAgICBzLmlkID0gdGhpcy5nbERyYXdpbmdDb250ZXh0LmNyZWF0ZVNoYWRlcihzLnR5cGUpO1xyXG4gICAgICB0aGlzLmdsRHJhd2luZ0NvbnRleHQuc2hhZGVyU291cmNlKHMuaWQsIHMuc3JjKTtcclxuICAgICAgdGhpcy5nbERyYXdpbmdDb250ZXh0LmNvbXBpbGVTaGFkZXIocy5pZCk7XHJcbiAgICAgIGlmICghdGhpcy5nbERyYXdpbmdDb250ZXh0LmdldFNoYWRlclBhcmFtZXRlcihzLmlkLCB0aGlzLmdsRHJhd2luZ0NvbnRleHQuQ09NUElMRV9TVEFUVVMpKSB7XHJcbiAgICAgICAgbGV0IGJ1ZiA9IHRoaXMuZ2xEcmF3aW5nQ29udGV4dC5nZXRTaGFkZXJJbmZvTG9nKHMuaWQpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGBTaGFkZXIgJHt0aGlzLm5hbWV9LyR7cy5uYW1lfSBjb21waWxlIGZhaWw6ICR7YnVmfWApO1xyXG4gICAgICB9ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgIH0pOyAgICAgICAgICAgICBcclxuIFxyXG4gICAgdGhpcy5pZCA9IHRoaXMuZ2xEcmF3aW5nQ29udGV4dC5jcmVhdGVQcm9ncmFtKCk7XHJcbiAgICB0aGlzLnNoYWRlcnMuZm9yRWFjaChzID0+IHtcclxuICAgICAgaWYgKHMuaWQgIT0gbnVsbClcclxuICAgICAgICB0aGlzLmdsRHJhd2luZ0NvbnRleHQuYXR0YWNoU2hhZGVyKHRoaXMuaWQsIHMuaWQpO1xyXG4gICAgfSk7XHJcbiAgICB0aGlzLmdsRHJhd2luZ0NvbnRleHQubGlua1Byb2dyYW0odGhpcy5pZCk7XHJcbiAgICBpZiAoIXRoaXMuZ2xEcmF3aW5nQ29udGV4dC5nZXRQcm9ncmFtUGFyYW1ldGVyKHRoaXMuaWQsIHRoaXMuZ2xEcmF3aW5nQ29udGV4dC5MSU5LX1NUQVRVUykpIHtcclxuICAgICAgbGV0IGJ1ZiA9IHRoaXMuZ2xEcmF3aW5nQ29udGV4dC5nZXRQcm9ncmFtSW5mb0xvZyh0aGlzLmlkKTtcclxuICAgICAgY29uc29sZS5sb2coYFNoYWRlciBwcm9ncmFtICR7dGhpcy5uYW1lfSBsaW5rIGZhaWw6ICR7YnVmfWApO1xyXG4gICAgfSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICB0aGlzLnVwZGF0ZVNoYWRlckRhdGEoKTsgICAgXHJcbiAgfVxyXG5cclxuICB1cGRhdGVTaGFkZXJEYXRhKCkge1xyXG4gICAgLy8gU2hhZGVyIGF0dHJpYnV0ZXNcclxuICAgIHRoaXMuYXR0cnMgPSB7fTtcclxuICAgIGNvbnN0IGNvdW50QXR0cnMgPSB0aGlzLmdsRHJhd2luZ0NvbnRleHQuZ2V0UHJvZ3JhbVBhcmFtZXRlcih0aGlzLmlkLCB0aGlzLmdsRHJhd2luZ0NvbnRleHQuQUNUSVZFX0FUVFJJQlVURVMpO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb3VudEF0dHJzOyBpKyspIHtcclxuICAgICAgY29uc3QgaW5mbyA9IHRoaXMuZ2xEcmF3aW5nQ29udGV4dC5nZXRBY3RpdmVBdHRyaWIodGhpcy5pZCwgaSk7XHJcbiAgICAgIHRoaXMuYXR0cnNbaW5mby5uYW1lXSA9IHtcclxuICAgICAgICBuYW1lOiBpbmZvLm5hbWUsXHJcbiAgICAgICAgdHlwZTogaW5mby50eXBlLFxyXG4gICAgICAgIHNpemU6IGluZm8uc2l6ZSxcclxuICAgICAgICBsb2M6IHRoaXMuZ2xEcmF3aW5nQ29udGV4dC5nZXRBdHRyaWJMb2NhdGlvbih0aGlzLmlkLCBpbmZvLm5hbWUpLFxyXG4gICAgICB9O1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvLyBTaGFkZXIgdW5pZm9ybXNcclxuICAgIHRoaXMudW5pZm9ybXMgPSB7fTtcclxuICAgIGNvbnN0IGNvdW50VW5pZm9ybXMgPSB0aGlzLmdsRHJhd2luZ0NvbnRleHQuZ2V0UHJvZ3JhbVBhcmFtZXRlcih0aGlzLmlkLCB0aGlzLmdsRHJhd2luZ0NvbnRleHQuQUNUSVZFX1VOSUZPUk1TKTtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY291bnRVbmlmb3JtczsgaSsrKSB7XHJcbiAgICAgIGNvbnN0IGluZm8gPSB0aGlzLmdsRHJhd2luZ0NvbnRleHQuZ2V0QWN0aXZlVW5pZm9ybSh0aGlzLmlkLCBpKTtcclxuICAgICAgdGhpcy51bmlmb3Jtc1tpbmZvLm5hbWVdID0ge1xyXG4gICAgICAgIG5hbWU6IGluZm8ubmFtZSxcclxuICAgICAgICB0eXBlOiBpbmZvLnR5cGUsXHJcbiAgICAgICAgc2l6ZTogaW5mby5zaXplLFxyXG4gICAgICAgIGxvYzogdGhpcy5nbERyYXdpbmdDb250ZXh0LmdldFVuaWZvcm1Mb2NhdGlvbih0aGlzLmlkLCBpbmZvLm5hbWUpLFxyXG4gICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFNoYWRlciB1bmlmb3JtIGJsb2Nrc1xyXG4gICAgdGhpcy51bmlmb3JtQmxvY2tzID0ge307XHJcbiAgICBjb25zdCBjb3VudFVuaWZvcm1CbG9ja3MgPSB0aGlzLmdsRHJhd2luZ0NvbnRleHQuZ2V0UHJvZ3JhbVBhcmFtZXRlcih0aGlzLmlkLCB0aGlzLmdsRHJhd2luZ0NvbnRleHQuQUNUSVZFX1VOSUZPUk1fQkxPQ0tTKTtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY291bnRVbmlmb3JtQmxvY2tzOyBpKyspIHtcclxuICAgICAgY29uc3QgYmxvY2tfbmFtZSA9IHRoaXMuZ2xEcmF3aW5nQ29udGV4dC5nZXRBY3RpdmVVbmlmb3JtQmxvY2tOYW1lKHRoaXMuaWQsIGkpO1xyXG4gICAgICBjb25zdCBpbmRleCA9IHRoaXMuZ2xEcmF3aW5nQ29udGV4dC5nZXRBY3RpdmVVbmlmb3JtQmxvY2tJbmRleCh0aGlzLmlkLCBibG9ja19uYW1lKTtcclxuICAgICAgdGhpcy51bmlmb3JtQmxvY2tzW2Jsb2NrX25hbWVdID0ge1xyXG4gICAgICAgIG5hbWU6IGJsb2NrX25hbWUsXHJcbiAgICAgICAgaW5kZXg6IGluZGV4LFxyXG4gICAgICAgIHNpemU6IHRoaXMuZ2xEcmF3aW5nQ29udGV4dC5nZXRBY3RpdmVVbmlmb3JtQmxvY2tQYXJhbWV0ZXIodGhpcy5pZCwgaWR4LCB0aGlzLmdsRHJhd2luZ0NvbnRleHQuVU5JRk9STV9CTE9DS19EQVRBX1NJWkUpLFxyXG4gICAgICAgIGJpbmQ6IHRoaXMuZ2xEcmF3aW5nQ29udGV4dC5nZXRBY3RpdmVVbmlmb3JtQmxvY2tQYXJhbWV0ZXIodGhpcy5pZCwgaWR4LCB0aGlzLmdsRHJhd2luZ0NvbnRleHQuVU5JRk9STV9CTE9DS19CSU5ESU5HKSxcclxuICAgICAgfTtcclxuICAgIH1cclxuICAgIFxyXG4gIH1cclxuIFxyXG4gIGNvbnN0cnVjdG9yKG5hbWUsIHJuZE9iaikge1xyXG4gICAgdGhpcy5nbERyYXdpbmdDb250ZXh0ID0gcm5kT2JqLmdsO1xyXG4gICAgdGhpcy5uYW1lID0gbmFtZTtcclxuICB9XHJcbiBcclxuICBhcHBseSgpIHtcclxuICAgIGlmICh0aGlzLmlkICE9IG51bGwpXHJcbiAgICAgIHRoaXMuZ2xEcmF3aW5nQ29udGV4dC51c2VQcm9ncmFtKHRoaXMuaWQpO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHNoYWRlcihuYW1lLCBybmRPYmopIHtcclxuICByZXR1cm4gbmV3IF9zaGFkZXIobmFtZSwgcm5kT2JqKTtcclxufSIsImltcG9ydCB7IHNoYWRlciB9IGZyb20gXCIuL3NoYWRlcnNcIjtcclxuXHJcbmNsYXNzIF9tYXRlcmlhbFBhdHRlcm4ge1xyXG4gIHNoZDtcclxuICBuYW1lO1xyXG5cclxuICBjb25zdHJ1Y3RvcihuYW1lLCBzaGROYW1lLCBybmRPYmopIHtcclxuICAgIHRoaXMubmFtZSA9IG5hbWU7XHJcbiAgICB0aGlzLnNoZCA9IHNoYWRlcihzaGROYW1lLCBybmRPYmopO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIG1hdGVyaWFsUGF0dGVybihuYW1lLCBzaGROYW1lLCBybmRPYmopIHtcclxuICByZXR1cm4gbmV3IF9tYXRlcmlhbFBhdHRlcm4obmFtZSwgc2hkTmFtZSwgcm5kT2JqKTtcclxufSIsImNsYXNzIF9wcmltIHtcclxuICB2ZXJ0ZXhCdWZmZXI7XHJcbiAgaW5kZXhCdWZmZXI7XHJcbiAgcHJpbU10bFB0bjtcclxuICB2ZXJ0ZXhBcnJheTtcclxuICBub29mViA9IDA7XHJcbiAgbm9vdkkgPSAwO1xyXG4gIHR5cGU7XHJcblxyXG4gIGNvbnN0cnVjdG9yKG10bFB0biwgdHlwZSwgdmVydGV4ZXMsIGluZGV4ZXMpIHtcclxuICAgIGxldCBnbCA9IG10bFB0bi5zaGQuZ2xEcmF3aW5nQ29udGV4dDtcclxuXHJcbiAgICBpZiAodHlwZSA9PSBcInRyaWFuZ2xlc1wiKVxyXG4gICAgICB0aGlzLnR5cGUgPSBtdGxQdG4uc2hkLmdsRHJhd2luZ0NvbnRleHQuVFJJQU5HTEVTO1xyXG4gICAgZWxzZSBpZiAodHlwZSA9PSBcInRyaWFuZ2xlIHN0cmlwXCIpXHJcbiAgICAgIHRoaXMudHlwZSA9IG10bFB0bi5zaGQuZ2xEcmF3aW5nQ29udGV4dC5UUklBTkdMRV9TVFJJUDtcclxuICAgIGVsc2UgaWYgKHR5cGUgPT0gXCJsaW5lIHN0cmlwXCIpXHJcbiAgICAgIHRoaXMudHlwZSA9IG10bFB0bi5zaGQuZ2xEcmF3aW5nQ29udGV4dC5MSU5FX1NUUklQO1xyXG4gICAgZWxzZSBpZiAodHlwZSA9PSBcImxpbmVzXCIpXHJcbiAgICAgIHRoaXMudHlwZSA9IG10bFB0bi5zaGQuZ2xEcmF3aW5nQ29udGV4dC5MSU5FUztcclxuICAgIGVsc2UgaWYgKHR5cGUgPT0gXCJ0cmlhbmdsZSBmdW5cIilcclxuICAgICAgdGhpcy50eXBlID0gbXRsUHRuLnNoZC5nbERyYXdpbmdDb250ZXh0LlRSSUFOR0xFX0ZVTjtcclxuICAgIGVsc2VcclxuICAgICAgdGhpcy50eXBlID0gbXRsUHRuLnNoZC5nbERyYXdpbmdDb250ZXh0LlBPSU5UUztcclxuXHJcbiAgICBsZXQgdmVydEZvcm1hdCA9IFtcclxuICAgICAge25hbWUgOiBcIlBvc2l0aW9uXCIsXHJcbiAgICAgICBzaXplIDogMTJ9LFxyXG4gICAgICB7bmFtZSA6IFwiTm9ybWFsXCIsXHJcbiAgICAgICBzaXplIDogMTJ9XHJcbiAgICAgIF07XHJcbiAgICBsZXQgdmVydFNpemUgPSAwO1xyXG4gICAgXHJcbiAgICB2ZXJ0Rm9ybWF0LmZvckVhY2goKGVsZW0pID0+IHtcclxuICAgICAgdmVydFNpemUgKz0gZWxlbS5zaXplO1xyXG4gICAgfSk7XHJcblxyXG4gICAgdGhpcy5ub29mViA9IHZlcnRleGVzLmxlbmd0aCAvICh2ZXJ0U2l6ZSAvIDQpO1xyXG5cclxuICAgIC8vL2NvbnNvbGUubG9nKG10bFB0bi5zaGQpO1xyXG5cclxuICAgIC8vIHZlcnRleCBidWZmZXJcclxuICAgIHRoaXMucHJpbU10bFB0biA9IG10bFB0bjtcclxuICAgIHRoaXMudmVydGV4QnVmZmVyID0gZ2wuY3JlYXRlQnVmZmVyKCk7XHJcbiAgICBnbC5iaW5kQnVmZmVyKGdsLkFSUkFZX0JVRkZFUiwgdGhpcy52ZXJ0ZXhCdWZmZXIpO1xyXG4gICAgZ2wuYnVmZmVyRGF0YShnbC5BUlJBWV9CVUZGRVIsIG5ldyBGbG9hdDMyQXJyYXkodmVydGV4ZXMpLCBnbC5TVEFUSUNfRFJBVyk7XHJcblxyXG4gICAgLy8gaW5kZXggYnVmZmVyXHJcbiAgICBpZiAoaW5kZXhlcyAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgdGhpcy5ub29mSSA9IGluZGV4ZXMubGVuZ3RoO1xyXG4gICAgICB0aGlzLmluZGV4QnVmZmVyID0gZ2wuY3JlYXRlQnVmZmVyKCk7XHJcbiAgICAgIGdsLmJpbmRCdWZmZXIoZ2wuRUxFTUVOVF9BUlJBWV9CVUZGRVIsIHRoaXMuaW5kZXhCdWZmZXIpO1xyXG4gICAgICBnbC5idWZmZXJEYXRhKGdsLkVMRU1FTlRfQVJSQVlfQlVGRkVSLCBuZXcgVWludDMyQXJyYXkoaW5kZXhlcyksIGdsLlNUQVRJQ19EUkFXKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyB2ZXJ0ZXggYXR0cmlic1xyXG4gICAgdGhpcy52ZXJ0ZXhBcnJheT0gZ2wuY3JlYXRlVmVydGV4QXJyYXkoKTtcclxuICAgIGdsLmJpbmRWZXJ0ZXhBcnJheSh0aGlzLnZlcnRleEFycmF5KTtcclxuXHJcbiAgICBsZXQgYWxsU2l6ZSA9IDA7XHJcbiAgICBmb3IgKGxldCBpIGluIHZlcnRGb3JtYXQpIHtcclxuICAgICAgbGV0IGZpbmRlZEF0dHIgPSBtdGxQdG4uc2hkLmF0dHJzW1wiSW5cIiArIHZlcnRGb3JtYXRbaV0ubmFtZV07XHJcblxyXG4gICAgICBpZiAoZmluZGVkQXR0ciAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICBsZXQgYXR0ckxvYyA9IG10bFB0bi5zaGQuYXR0cnNbXCJJblwiICsgdmVydEZvcm1hdFtpXS5uYW1lXS5sb2M7XHJcblxyXG4gICAgICAgIGlmIChhdHRyTG9jICE9IC0xKSB7XHJcbiAgICAgICAgICBnbC52ZXJ0ZXhBdHRyaWJQb2ludGVyKGF0dHJMb2MsIHZlcnRGb3JtYXRbaV0uc2l6ZSAvIDQsIGdsLkZMT0FULCBmYWxzZSwgdmVydFNpemUsIGFsbFNpemUpO1xyXG4gICAgICAgICAgZ2wuZW5hYmxlVmVydGV4QXR0cmliQXJyYXkoYXR0ckxvYyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBhbGxTaXplICs9IHZlcnRGb3JtYXRbaV0uc2l6ZTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHByaW0obXRsUHRuLCB0eXBlLCB2ZXJ0ZXhlcywgaW5kZXhlcykge1xyXG4gIHJldHVybiBuZXcgX3ByaW0obXRsUHRuLCB0eXBlLCB2ZXJ0ZXhlcywgaW5kZXhlcyk7XHJcbn1cclxuIiwiaW1wb3J0IHsgdmVjMyB9IGZyb20gXCIuLi8uLi9tYXRoL3ZlYzMuanNcIlxyXG5cclxuY2xhc3MgX3ZlcnRleCB7XHJcbiAgcG9zO1xyXG4gIG5vcm07XHJcblxyXG4gIGNvbnN0cnVjdG9yKHBvcywgbm9ybSkge1xyXG4gICAgdGhpcy5wb3MgPSB2ZWMzKHBvcyk7XHJcblxyXG4gICAgaWYgKG5vcm0gPT0gdW5kZWZpbmVkKVxyXG4gICAgICB0aGlzLm5vcm0gPSB2ZWMzKDApO1xyXG4gICAgZWxzZSAgXHJcbiAgICAgIHRoaXMubm9ybSA9IHZlYzMobm9ybSk7XHJcbiAgfVxyXG5cclxuICB0b0FycmF5KCkge1xyXG4gICAgcmV0dXJuIFt0aGlzLnBvcy54LCB0aGlzLnBvcy55LCB0aGlzLnBvcy56LCB0aGlzLm5vcm0ueCwgdGhpcy5ub3JtLnksIHRoaXMubm9ybS56XTtcclxuICB9XHJcblxyXG4gIGNyZWF0ZVZlcnRleEFycmF5KC4uLmFyZ3MpIHtcclxuICAgIGxldCB2cztcclxuXHJcbiAgICBpZiAoYXJncy5sZW5ndGggPT0gMSAmJiBBcnJheS5pc0FycmF5KGFyZ3NbMF0pKVxyXG4gICAgICB2cyA9IGFyZ3NbMF07XHJcbiAgICBlbHNlXHJcbiAgICAgIHZzID0gYXJncztcclxuXHJcbiAgICBsZXQgdiA9IFtdXHJcblxyXG4gICAgdnMuZm9yRWFjaChlbGVtZW50ID0+IHtcclxuICAgICAgdi5wdXNoKC4uLmVsZW1lbnQudG9BcnJheSgpKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiB2O1xyXG4gIH1cclxuXHJcbiAgYXV0b05vcm1hbCh2ZXJ0ZXhlcywgaW5kZXhlcykge1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB2ZXJ0ZXhlcy5sZW5ndGg7IGkrKyl7XHJcbiAgICAgIHZlcnRleGVzW2ldLm5vcm0gPSB2ZWMzKDApO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChpbmRleGVzID09IHVuZGVmaW5lZCkge1xyXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHZlcnRleGVzLmxlbmd0aDsgKXtcclxuICAgICAgICBsZXQgdjEgPSB2ZXJ0ZXhlc1tpICsgMV0ucG9zLnN1YlZlYyh2ZXJ0ZXhlc1tpXS5wb3MpO1xyXG4gICAgICAgIGxldCB2MiA9IHZlcnRleGVzW2kgKyAyXS5wb3Muc3ViVmVjKHZlcnRleGVzW2ldLnBvcyk7XHJcblxyXG4gICAgICAgIGxldCBuID0gdjEuY3Jvc3ModjIpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHZlcnRleGVzW2ldLm5vcm0gPSB2ZXJ0ZXhlc1tpXS5ub3JtLmFkZFZlYyhuKTtcclxuICAgICAgICB2ZXJ0ZXhlc1tpICsgMV0ubm9ybSA9IHZlcnRleGVzW2kgKyAxXS5ub3JtLmFkZFZlYyhuKTtcclxuICAgICAgICB2ZXJ0ZXhlc1tpICsgMl0ubm9ybSA9IHZlcnRleGVzW2kgKyAyXS5ub3JtLmFkZFZlYyhuKTtcclxuXHJcbiAgICAgICAgaSArPSAzO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IGluZGV4ZXMubGVuZ3RoOyApIHtcclxuICAgICAgICBpZiAoaW5kZXhlc1tqXSA9PSAtMSB8fCBpbmRleGVzW2ogKyAxXSA9PSAtMSB8fCBpbmRleGVzW2ogKyAyXSA9PSAtMSkge1xyXG4gICAgICAgICAgaisrO1xyXG4gICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgdjEgPSB2ZXJ0ZXhlc1tpbmRleGVzW2ogKyAxXV0ucG9zLnN1YlZlYyh2ZXJ0ZXhlc1tpbmRleGVzW2pdXS5wb3MpO1xyXG4gICAgICAgIGxldCB2MiA9IHZlcnRleGVzW2luZGV4ZXNbaiArIDJdXS5wb3Muc3ViVmVjKHZlcnRleGVzW2luZGV4ZXNbal1dLnBvcyk7XHJcblxyXG4gICAgICAgIGxldCBuID0gdjEuY3Jvc3ModjIpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHZlcnRleGVzW2luZGV4ZXNbal1dLm5vcm0gPSB2ZXJ0ZXhlc1tpbmRleGVzW2pdXS5ub3JtLmFkZFZlYyhuKTtcclxuICAgICAgICB2ZXJ0ZXhlc1tpbmRleGVzW2ogKyAxXV0ubm9ybSA9IHZlcnRleGVzW2luZGV4ZXNbaiArIDFdXS5ub3JtLmFkZFZlYyhuKTtcclxuICAgICAgICB2ZXJ0ZXhlc1tpbmRleGVzW2ogKyAyXV0ubm9ybSA9IHZlcnRleGVzW2luZGV4ZXNbaiArIDJdXS5ub3JtLmFkZFZlYyhuKTtcclxuXHJcbiAgICAgICAgaiArPSAzO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB2ZXJ0ZXhlcy5sZW5ndGg7IGkrKyl7XHJcbiAgICAgIHZlcnRleGVzW2ldLm5vcm0gPSB2ZXJ0ZXhlc1tpXS5ub3JtLm5vcm1hbGl6ZSgpO1xyXG4gICAgXHJcbiAgICB9ICBcclxuICAgIHJldHVybiB2ZXJ0ZXhlcztcclxuICBcclxuICB9XHJcblxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gdmVydGV4KHBvcywgbm9ybSkge1xyXG4gIHJldHVybiBuZXcgX3ZlcnRleChwb3MsIG5vcm0pO1xyXG59IiwiaW1wb3J0IHsgdmVjMyB9IGZyb20gXCIuLi8uLi9tYXRoL3ZlYzNcIjtcclxuaW1wb3J0IHsgcHJpbSB9IGZyb20gXCIuL3ByaW1cIjtcclxuaW1wb3J0IHsgdmVydGV4IH0gZnJvbSBcIi4vdmVydGV4XCI7XHJcblxyXG5leHBvcnQgY2xhc3MgUGxhdG9uIHtcclxuICBzdGF0aWMgY3ViZUNyZWF0ZShtdGxQdG4sIHNpemUpIHtcclxuICAgIGxldCBwbnRzID0gW1xyXG4gICAgICB2ZWMzKC0xLCAtMSwgLTEpLCB2ZWMzKDEsIC0xLCAtMSksXHJcbiAgICAgIHZlYzMoMSwgLTEsIDEpLCB2ZWMzKC0xLCAtMSwgMSksXHJcbiAgICAgIHZlYzMoLTEsIDEsIC0xKSwgdmVjMygxLCAxLCAtMSksXHJcbiAgICAgIHZlYzMoMSwgMSwgMSksIHZlYzMoLTEsIDEsIDEpLFxyXG4gICAgXTtcclxuICAgIFxyXG4gICAgbGV0IGluZCA9IFtcclxuICAgICAgMSwgMCwgMiwgMywgLTEsXHJcbiAgICAgIDUsIDYsIDEsIDIsIC0xLFxyXG4gICAgICA2LCA3LCAyLCAzLCAtMSxcclxuICAgICAgNywgNCwgMywgMCwgLTEsXHJcbiAgICAgIDQsIDUsIDAsIDEsIC0xLFxyXG4gICAgICA0LCA1LCA3LCA2LCAtMSxcclxuICAgIF07XHJcbiAgXHJcbiAgICBsZXQgbm9ybXMgPSBbXHJcbiAgICAgIHZlYzMoMCwgLTEsIDApLCB2ZWMzKDEsIDAsIDApLFxyXG4gICAgICB2ZWMzKDAsIDAsIDEpLCB2ZWMzKC0xLCAwLCAwKSxcclxuICAgICAgdmVjMygwLCAwLCAtMSksIHZlYzMoMCwgMSwgMCksXHJcbiAgICBdXHJcbiAgXHJcbiAgICBsZXQgdmVydCA9IFtdO1xyXG4gIFxyXG4gICAgbGV0IHVJbmQgPSBbXTtcclxuICBcclxuICAgIGxldCBqID0gMDtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaW5kLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIGlmIChpbmRbaV0gIT0gLTEpIHtcclxuICAgICAgICB2ZXJ0LnB1c2godmVydGV4KHBudHNbaW5kW2ldXS5tdWxOdW0oc2l6ZSksIG5vcm1zW01hdGguZmxvb3IoaSAvIDUpXSkpO1xyXG4gICAgICAgIHVJbmQucHVzaChqKTtcclxuICAgICAgICBqKys7XHJcbiAgICAgIH1cclxuICAgICAgZWxzZVxyXG4gICAgICAgIHVJbmQucHVzaCgtMSk7XHJcbiAgICB9XHJcbiAgXHJcbiAgICBsZXQgdmVydGV4QXJyID0gdmVydGV4KCkuY3JlYXRlVmVydGV4QXJyYXkodmVydCk7XHJcbiAgXHJcbiAgICByZXR1cm4gcHJpbShtdGxQdG4sIFwidHJpYW5nbGUgc3RyaXBcIiwgdmVydGV4QXJyLCB1SW5kKTtcclxuICB9XHJcbiAgXHJcbiAgc3RhdGljIG9jdENyZWF0ZShtdGxQdG4sIHNpemUpIHtcclxuICAgIGxldCBwbnRzID0gW1xyXG4gICAgICB2ZWMzKDAsIDEsIDApLCB2ZWMzKDAsIDAsIDEpLFxyXG4gICAgICB2ZWMzKC0xLCAwLCAwKSwgdmVjMygwLCAwLCAtMSksXHJcbiAgICAgIHZlYzMoMSwgMCwgMCksIHZlYzMoMCwgLTEsIDApLFxyXG4gICAgXTtcclxuICAgIFxyXG4gICAgbGV0IGluZCA9IFtcclxuICAgICAgMCwgMSwgMixcclxuICAgICAgMCwgMiwgMyxcclxuICAgICAgMCwgMywgNCxcclxuICAgICAgMCwgNCwgMSxcclxuICAgICAgNSwgMSwgMixcclxuICAgICAgNSwgMiwgMyxcclxuICAgICAgNSwgMywgNCxcclxuICAgICAgNSwgNCwgMSxcclxuICAgIF07XHJcbiAgXHJcbiAgICBsZXQgdmVydCA9IFtdO1xyXG4gIFxyXG4gICAgbGV0IHVJbmQgPSBbXTtcclxuICBcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaW5kLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIHZlcnQucHVzaCh2ZXJ0ZXgocG50c1tpbmRbaV1dLm11bE51bShzaXplKSkpO1xyXG4gICAgfVxyXG4gIFxyXG4gICAgdmVydCA9IHZlcnRleCgpLmF1dG9Ob3JtYWwodmVydCk7XHJcbiAgXHJcbiAgICBsZXQgdmVydGV4QXJyID0gdmVydGV4KCkuY3JlYXRlVmVydGV4QXJyYXkodmVydCk7XHJcbiAgXHJcbiAgICByZXR1cm4gcHJpbShtdGxQdG4sIFwidHJpYW5nbGVzXCIsIHZlcnRleEFycik7XHJcbiAgXHJcbiAgfVxyXG4gIFxyXG4gIHN0YXRpYyB0ZXRyQ3JlYXRlKG10bFB0biwgc2l6ZSkge1xyXG4gICAgY29uc3Qgc3FydDMgPSBNYXRoLnNxcnQoMyk7XHJcbiAgICBjb25zdCBzcXJ0MjMgPSBNYXRoLnNxcnQoMiAvIDMpO1xyXG4gIFxyXG4gICAgbGV0IHZ0ID0gW1xyXG4gICAgICB2ZXJ0ZXgodmVjMygwLCAwLCBzcXJ0MyAvIDMpKSwgdmVydGV4KHZlYzMoMC41LCAwLCAtc3FydDMgLyA2KSksIHZlcnRleCh2ZWMzKC0wLjUsIDAsIC1zcXJ0MyAvIDYpKSxcclxuICAgICAgdmVydGV4KHZlYzMoMCwgc3FydDIzLCAwKSksIHZlcnRleCh2ZWMzKDAuNSwgMCwgLXNxcnQzIC8gNikpLCB2ZXJ0ZXgodmVjMygtMC41LCAwLCAtc3FydDMgLyA2KSksXHJcbiAgICAgIHZlcnRleCh2ZWMzKDAsIHNxcnQyMywgMCkpLCB2ZXJ0ZXgodmVjMygwLjUsIDAsIC1zcXJ0MyAvIDYpKSwgdmVydGV4KHZlYzMoMCwgMCwgc3FydDMgLyAzKSksXHJcbiAgICAgIHZlcnRleCh2ZWMzKDAsIHNxcnQyMywgMCkpLCB2ZXJ0ZXgodmVjMygtMC41LCAwLCAtc3FydDMgLyA2KSksIHZlcnRleCh2ZWMzKDAsIDAsIHNxcnQzIC8gMykpLFxyXG4gICAgXTtcclxuICBcclxuICAgIHZ0LmZvckVhY2goKHZlcnQpID0+IHtcclxuICAgICAgdmVydC5wb3MgPSB2ZXJ0LnBvcy5tdWxOdW0oc2l6ZSk7XHJcbiAgICB9KVxyXG4gIFxyXG4gICAgdnQgPSB2ZXJ0ZXgoKS5hdXRvTm9ybWFsKHZ0KTtcclxuICBcclxuICAgIHZ0ID0gdmVydGV4KCkuY3JlYXRlVmVydGV4QXJyYXkodnQpO1xyXG4gIFxyXG4gICAgcmV0dXJuIHByaW0obXRsUHRuLCBcInRyaWFuZ2xlc1wiLCB2dCk7XHJcbiAgfVxyXG4gIFxyXG4gIHN0YXRpYyBpY29DcmVhdGUobXRsUHRuLCBzaXplKSB7XHJcbiAgICBjb25zdCBcclxuICAgICAgc3FydDVkMiA9IE1hdGguc3FydCg1KSAvIDIsXHJcbiAgICAgIHNpbjcyID0gTWF0aC5zaW4oNzIgKiBNYXRoLlBJIC8gMTgwKSxcclxuICAgICAgY29zNzIgPSBNYXRoLmNvcyg3MiAqIE1hdGguUEkgLyAxODApO1xyXG4gIFxyXG4gICAgbGV0IHBudHMgPSBbXHJcbiAgICAgIHZlYzMoMCwgc3FydDVkMiwgMClcclxuICAgIF1cclxuICBcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNTsgaSsrKSB7XHJcbiAgICAgIHBudHMucHVzaCh2ZWMzKE1hdGguY29zKCg3MiAqIGkpICogTWF0aC5QSSAvMTgwKSwgMC41LCBNYXRoLnNpbigoNzIgKiBpKSAqIE1hdGguUEkgLzE4MCkpKTtcclxuICAgIH1cclxuICBcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNTsgaSsrKSB7XHJcbiAgICAgIHBudHMucHVzaCh2ZWMzKC1NYXRoLmNvcygoNzIgKiBpKSAqIE1hdGguUEkgLzE4MCksIC0wLjUsIC1NYXRoLnNpbigoNzIgKiBpKSAqIE1hdGguUEkgLzE4MCkpKTtcclxuICAgIH1cclxuICBcclxuICAgIHBudHMucHVzaCh2ZWMzKDAsIC1zcXJ0NWQyLCAwKSk7XHJcbiAgXHJcbiAgICBsZXQgaW5kID0gW1xyXG4gICAgICAwLCAxLCAyLFxyXG4gICAgICAwLCAyLCAzLFxyXG4gICAgICAwLCAzLCA0LFxyXG4gICAgICAwLCA0LCA1LFxyXG4gICAgICAwLCA1LCAxLFxyXG4gICAgICAxLCA5LCA4LCBcclxuICAgICAgMSwgMiwgOSxcclxuICAgICAgMiwgMTAsIDksXHJcbiAgICAgIDIsIDMsIDEwLFxyXG4gICAgICAzLCA2LCAxMCxcclxuICAgICAgMywgNCwgNixcclxuICAgICAgNCwgNywgNixcclxuICAgICAgNCwgNSwgNyxcclxuICAgICAgNSwgOCwgNyxcclxuICAgICAgNSwgMSwgOCxcclxuICAgICAgMTEsIDYsIDcsXHJcbiAgICAgIDExLCA3LCA4LFxyXG4gICAgICAxMSwgOCwgOSxcclxuICAgICAgMTEsIDksIDEwLFxyXG4gICAgICAxMSwgMTAsIDYsXHJcbiAgICBdO1xyXG4gIFxyXG4gICAgbGV0IHZlcnQgPSBbXTtcclxuICBcclxuICAgIGZvciAobGV0IGkgaW4gaW5kKSB7XHJcbiAgICAgIHZlcnQucHVzaCh2ZXJ0ZXgocG50c1tpbmRbaV1dLm11bE51bShzaXplKSkpO1xyXG4gICAgfVxyXG4gIFxyXG4gICAgdmVydGV4KCkuYXV0b05vcm1hbCh2ZXJ0KTtcclxuICAgIFxyXG4gICAgbGV0IHZlcnRleEFyciA9IHZlcnRleCgpLmNyZWF0ZVZlcnRleEFycmF5KHZlcnQpO1xyXG4gIFxyXG4gICAgcmV0dXJuIHByaW0obXRsUHRuLCBcInRyaWFuZ2xlc1wiLCB2ZXJ0ZXhBcnIpO1xyXG4gIH1cclxuICBcclxuICBzdGF0aWMgZG9kZWNDcmVhdGUobXRsUHRuLCBzaXplKSB7XHJcbiAgICBjb25zdCBcclxuICAgICAgc3FydDVkMiA9IE1hdGguc3FydCg1KSAvIDIsXHJcbiAgICAgIHNpbjcyID0gTWF0aC5zaW4oNzIgKiBNYXRoLlBJIC8gMTgwKSxcclxuICAgICAgY29zNzIgPSBNYXRoLmNvcyg3MiAqIE1hdGguUEkgLyAxODApO1xyXG4gIFxyXG4gICAgbGV0IHBudHMwID0gW1xyXG4gICAgICB2ZWMzKDAsIHNxcnQ1ZDIsIDApXHJcbiAgICBdXHJcbiAgXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDU7IGkrKykge1xyXG4gICAgICBwbnRzMC5wdXNoKHZlYzMoTWF0aC5jb3MoKDcyICogaSkgKiBNYXRoLlBJIC8xODApLCAwLjUsIE1hdGguc2luKCg3MiAqIGkpICogTWF0aC5QSSAvMTgwKSkpO1xyXG4gICAgfVxyXG4gIFxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCA1OyBpKyspIHtcclxuICAgICAgcG50czAucHVzaCh2ZWMzKC1NYXRoLmNvcygoNzIgKiBpKSAqIE1hdGguUEkgLzE4MCksIC0wLjUsIC1NYXRoLnNpbigoNzIgKiBpKSAqIE1hdGguUEkgLzE4MCkpKTtcclxuICAgIH1cclxuICBcclxuICAgIHBudHMwLnB1c2godmVjMygwLCAtc3FydDVkMiwgMCkpO1xyXG4gIFxyXG4gICAgbGV0IGluZCA9IFtcclxuICAgICAgMCwgMSwgMixcclxuICAgICAgMCwgMiwgMyxcclxuICAgICAgMCwgMywgNCxcclxuICAgICAgMCwgNCwgNSxcclxuICAgICAgMCwgNSwgMSxcclxuICAgICAgMSwgOSwgOCwgXHJcbiAgICAgIDEsIDIsIDksXHJcbiAgICAgIDIsIDEwLCA5LFxyXG4gICAgICAyLCAzLCAxMCxcclxuICAgICAgMywgNiwgMTAsXHJcbiAgICAgIDMsIDQsIDYsXHJcbiAgICAgIDQsIDcsIDYsXHJcbiAgICAgIDQsIDUsIDcsXHJcbiAgICAgIDUsIDgsIDcsXHJcbiAgICAgIDUsIDEsIDgsXHJcbiAgICAgIDExLCA2LCA3LFxyXG4gICAgICAxMSwgNywgOCxcclxuICAgICAgMTEsIDgsIDksXHJcbiAgICAgIDExLCA5LCAxMCxcclxuICAgICAgMTEsIDEwLCA2LFxyXG4gICAgXTtcclxuICBcclxuICAgIGxldCBwbnRzMSA9IFtdO1xyXG4gIFxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpbmQubGVuZ3RoOyBpICs9IDMpIHtcclxuICAgICAgcG50czEucHVzaChwbnRzMFtpbmRbaV1dLmFkZFZlYyhwbnRzMFtpbmRbaSArIDFdXSkuYWRkVmVjKHBudHMwW2luZFtpICsgMl1dKS5kaXZOdW0oMykpO1xyXG4gICAgfVxyXG4gIFxyXG4gICAgbGV0IGluZGV4ZXMgPSBbXHJcbiAgICAgIDAsIDEsIDIsIDAsIDIsIDMsIDAsIDMsIDQsXHJcbiAgICAgIDAsIDEsIDgsIDAsIDgsIDcsIDAsIDcsIDYsXHJcbiAgICAgIDEsIDIsIDEwLCAxLCAxMCwgOSwgMSwgOSwgOCxcclxuICAgICAgMiwgMywgMTIsIDIsIDEyLCAxMSwgMiwgMTEsIDEwLFxyXG4gICAgICAzLCA0LCAxNCwgMywgMTQsIDEzLCAzLCAxMywgMTIsXHJcbiAgICAgIDQsIDAsIDYsIDQsIDYsIDUsIDQsIDUsIDE0LFxyXG4gICAgICA3LCA4LCA5LCA3LCA5LCAxOSwgNywgMTksIDE4LFxyXG4gICAgICA5LCAxMCwgMTEsIDksIDExLCAxNSwgOSwgMTUsIDE5LFxyXG4gICAgICAxMSwgMTIsIDEzLCAxMSwgMTMsIDE2LCAxMSwgMTYsIDE1LFxyXG4gICAgICAxMywgMTQsIDUsIDEzLCA1LCAxNywgMTMsIDE3LCAxNixcclxuICAgICAgNSwgNiwgNywgNSwgNywgMTgsIDUsIDE4LCAxNyxcclxuICAgICAgMTUsIDE2LCAxNywgMTUsIDE3LCAxOCwgMTUsIDE4LCAxOSxcclxuICAgIF1cclxuICBcclxuICAgIGxldCB2ZXJ0ID0gW107XHJcbiAgXHJcbiAgICBmb3IgKGxldCBpIGluIGluZGV4ZXMpIHtcclxuICAgICAgdmVydC5wdXNoKHZlcnRleChwbnRzMVtpbmRleGVzW2ldXS5tdWxOdW0oc2l6ZSkpKTtcclxuICAgIH1cclxuICBcclxuICAgIHZlcnRleCgpLmF1dG9Ob3JtYWwodmVydCk7XHJcbiAgICBcclxuICAgIGxldCB2ZXJ0ZXhBcnIgPSB2ZXJ0ZXgoKS5jcmVhdGVWZXJ0ZXhBcnJheSh2ZXJ0KTtcclxuICBcclxuICAgIHJldHVybiBwcmltKG10bFB0biwgXCJ0cmlhbmdsZXNcIiwgdmVydGV4QXJyKTtcclxuICB9XHJcbiAgXHJcbiAgc3RhdGljIHRydW5jZWRJY29DcmVhdGUobXRsUHRuLCBzaXplKSB7XHJcbiAgICBjb25zdCBcclxuICAgICAgc3FydDVkMiA9IE1hdGguc3FydCg1KSAvIDIsXHJcbiAgICAgIHNpbjcyID0gTWF0aC5zaW4oNzIgKiBNYXRoLlBJIC8gMTgwKSxcclxuICAgICAgY29zNzIgPSBNYXRoLmNvcyg3MiAqIE1hdGguUEkgLyAxODApO1xyXG4gIFxyXG4gICAgbGV0IHBudHMwID0gW1xyXG4gICAgICB2ZWMzKDAsIHNxcnQ1ZDIsIDApXHJcbiAgICBdXHJcbiAgXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDU7IGkrKykge1xyXG4gICAgICBwbnRzMC5wdXNoKHZlYzMoTWF0aC5jb3MoKDcyICogaSkgKiBNYXRoLlBJIC8xODApLCAwLjUsIE1hdGguc2luKCg3MiAqIGkpICogTWF0aC5QSSAvMTgwKSkpO1xyXG4gICAgfVxyXG4gIFxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCA1OyBpKyspIHtcclxuICAgICAgcG50czAucHVzaCh2ZWMzKC1NYXRoLmNvcygoNzIgKiBpKSAqIE1hdGguUEkgLzE4MCksIC0wLjUsIC1NYXRoLnNpbigoNzIgKiBpKSAqIE1hdGguUEkgLzE4MCkpKTtcclxuICAgIH1cclxuICBcclxuICAgIHBudHMwLnB1c2godmVjMygwLCAtc3FydDVkMiwgMCkpO1xyXG5cclxuICAgIGxldCBpbmQgPSBbXTtcclxuXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDU7IGkrKykge1xyXG4gICAgICBpbmQucHVzaCgwLCBpICsgMSk7XHJcbiAgICB9XHJcblxyXG4gICAgZm9yIChsZXQgaSA9IDE7IGkgPCA2OyBpKyspIHtcclxuICAgICAgaW5kLnB1c2goaSwgMSArIChpKSAlIDUpO1xyXG4gICAgfVxyXG5cclxuICAgIFxyXG4gICAgbGV0IGggPSBbXHJcbiAgICAgIDEsIDksXHJcbiAgICAgIDIsIDksXHJcbiAgICAgIDIsIDEwLFxyXG4gICAgICAzLCAxMCxcclxuICAgICAgMywgNixcclxuICAgICAgNCwgNixcclxuICAgICAgNCwgNyxcclxuICAgICAgNSwgNyxcclxuICAgICAgNSwgOCxcclxuICAgICAgMSwgOCxcclxuICAgIF1cclxuICAgIGluZCA9IGluZC5jb25jYXQoaCk7XHJcblxyXG4gICAgZm9yIChsZXQgaSA9IDE7IGkgPCA2OyBpKyspIHtcclxuICAgICAgaW5kLnB1c2goNSArIGksIDYgKyBpICUgNSk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNTsgaSsrKSB7XHJcbiAgICAgIGluZC5wdXNoKDExLCA1ICsgaSArIDEpO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCBwbnRzMSA9IFtdO1xyXG5cclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaW5kLmxlbmd0aDsgaSArPSAyKSB7XHJcbiAgICAgIHBudHMxLnB1c2goXHJcbiAgICAgICAgcG50czBbaW5kW2ldXS5tdWxOdW0oMiAvIDMpLmFkZFZlYyhwbnRzMFtpbmRbaSArIDFdXS5tdWxOdW0oMSAvIDMpKSxcclxuICAgICAgICBwbnRzMFtpbmRbaV1dLm11bE51bSgxIC8gMykuYWRkVmVjKHBudHMwW2luZFtpICsgMV1dLm11bE51bSgyIC8gMykpXHJcbiAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IGluZGV4ZXNQZW50ID0gW1xyXG4gICAgICAvLyB1cFxyXG4gICAgICBbMCwgMiwgNCwgNiwgOF0sXHJcbiAgICAgIC8vIDJzdCBsYXVlclxyXG4gICAgICBbMSwgMTAsIDIwLCAzOCwgMTldLFxyXG4gICAgICBbMywgMTIsIDI0LCAyMiwgMTFdLFxyXG4gICAgICBbNSwgMTQsIDI4LCAyNiwgMTNdLFxyXG4gICAgICBbNywgMTUsIDMwLCAzMiwgMTZdLCBcclxuICAgICAgWzksIDE4LCAzNiwgMzQsIDE3XSxcclxuICAgICAgLy8gMm5kIGxhdWVyXHJcbiAgICAgIFsyMSwgMjMsIDQ2LCA1NywgNDVdLFxyXG4gICAgICBbMjUsIDI3LCA0OCwgNTksIDQ3XSxcclxuICAgICAgWzI5LCAzMSwgNDAsIDUxLCA0OV0sXHJcbiAgICAgIFszMywgMzUsIDQyLCA1MywgNDFdLFxyXG4gICAgICBbMzksIDM3LCA0MywgNTUsIDQ0XSxcclxuICAgICAgLy8gZG93blxyXG4gICAgICBbNTAsIDUyLCA1NCwgNTYsIDU4XSxcclxuICAgIF07XHJcblxyXG4gICAgbGV0IGluZGV4ZXNIZXggPSBbXHJcbiAgICAgIC8vIHVwIGxheWVyXHJcbiAgICAgIFswLCAxLCAxMCwgMTEsIDMsIDJdLFxyXG4gICAgICBbMiwgMywgMTIsIDEzLCA1LCA0XSxcclxuICAgICAgWzQsIDUsIDE0LCAxNSwgNywgNl0sXHJcbiAgICAgIFs2LCA3LCAxNiwgMTcsIDksIDhdLFxyXG4gICAgICBbOCwgOSwgMTgsIDE5LCAxLCAwXSxcclxuICAgICAgLy8gbWlkZGxlIGxheWVyIFxyXG4gICAgICBbMjAsIDIxLCAyMywgMjIsIDExLCAxMF0sXHJcbiAgICAgIFsyMiwgMjMsIDQ2LCA0NywgMjUsIDI0XSxcclxuICAgICAgWzI0LCAyNSwgMjcsIDI2LCAxMywgMTJdLFxyXG4gICAgICBbMjYsIDI3LCA0OCwgNDksIDI5LCAyOF0sXHJcbiAgICAgIFsyOCwgMjksIDMxLCAzMCwgMTUsIDE0XSxcclxuICAgICAgWzMwLCAzMSwgNDAsIDQxLCAzMywgMzJdLFxyXG4gICAgICBbMzIsIDMzLCAzNSwgMzQsIDE3LCAxNl0sXHJcbiAgICAgIFszNCwgMzUsIDQyLCA0MywgMzcsIDM2XSxcclxuICAgICAgWzM2LCAzNywgMzksIDM4LCAxOSwgMThdLFxyXG4gICAgICBbMzgsIDM5LCA0NCwgNDUsIDIxLCAyMF0sXHJcbiAgICAgIC8vIGRvd24gbGF5ZXJcclxuICAgICAgWzUwLCA1MSwgNDAsIDQxLCA1MywgNTJdLFxyXG4gICAgICBbNTIsIDUzLCA0MiwgNDMsIDU1LCA1NF0sXHJcbiAgICAgIFs1NCwgNTUsIDQ0LCA0NSwgNTcsIDU2XSxcclxuICAgICAgWzU2LCA1NywgNDYsIDQ3LCA1OSwgNThdLFxyXG4gICAgICBbNTgsIDU5LCA0OCwgNDksIDUxLCA1MF0sXHJcbiAgICBdO1xyXG5cclxuICAgIGxldCBwbnRzUiA9IFtdO1xyXG5cclxuICAgIGZvciAobGV0IGkgaW4gaW5kZXhlc1BlbnQpe1xyXG4gICAgICBwbnRzUi5wdXNoKC4uLmNyZWF0ZVBlbnRhZ29uKFxyXG4gICAgICAgIHBudHMxW2luZGV4ZXNQZW50W2ldWzBdXSxcclxuICAgICAgICBwbnRzMVtpbmRleGVzUGVudFtpXVsxXV0sXHJcbiAgICAgICAgcG50czFbaW5kZXhlc1BlbnRbaV1bMl1dLFxyXG4gICAgICAgIHBudHMxW2luZGV4ZXNQZW50W2ldWzNdXSxcclxuICAgICAgICBwbnRzMVtpbmRleGVzUGVudFtpXVs0XV0pKTtcclxuICAgIH1cclxuXHJcbiAgICBmb3IgKGxldCBpIGluIGluZGV4ZXNIZXgpe1xyXG4gICAgICBwbnRzUi5wdXNoKC4uLmNyZWF0ZUhleGFnb24oXHJcbiAgICAgICAgcG50czFbaW5kZXhlc0hleFtpXVswXV0sXHJcbiAgICAgICAgcG50czFbaW5kZXhlc0hleFtpXVsxXV0sXHJcbiAgICAgICAgcG50czFbaW5kZXhlc0hleFtpXVsyXV0sXHJcbiAgICAgICAgcG50czFbaW5kZXhlc0hleFtpXVszXV0sXHJcbiAgICAgICAgcG50czFbaW5kZXhlc0hleFtpXVs0XV0sXHJcbiAgICAgICAgcG50czFbaW5kZXhlc0hleFtpXVs1XV0pKTtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgdmVydCA9IFtdO1xyXG5cclxuICAgIGZvciAobGV0IGkgaW4gcG50c1IpIHtcclxuICAgICAgdmVydC5wdXNoKHZlcnRleChwbnRzUltpXSkpO1xyXG4gICAgfVxyXG5cclxuICAgIHZlcnRleCgpLmF1dG9Ob3JtYWwodmVydCk7XHJcbiAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAgICAgIFxyXG4gICAgXHJcbiAgICBsZXQgdmVydGV4ZXMgPSB2ZXJ0ZXgoKS5jcmVhdGVWZXJ0ZXhBcnJheSh2ZXJ0KTtcclxuXHJcbiAgICByZXR1cm4gcHJpbShtdGxQdG4sIFwidHJpYW5nbGVzXCIsIHZlcnRleGVzKTtcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZVBlbnRhZ29uKHAwLCBwMSwgcDIsIHAzLCBwNCkge1xyXG4gIHJldHVybiBbXHJcbiAgICB2ZWMzKHAwKSwgdmVjMyhwMSksIHZlYzMocDIpLFxyXG4gICAgdmVjMyhwMCksIHZlYzMocDIpLCB2ZWMzKHAzKSxcclxuICAgIHZlYzMocDApLCB2ZWMzKHAzKSwgdmVjMyhwNCksXHJcbiAgXVxyXG59XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVIZXhhZ29uKHAwLCBwMSwgcDIsIHAzLCBwNCwgcDUpIHtcclxuICByZXR1cm4gW1xyXG4gICAgdmVjMyhwMCksIHZlYzMocDEpLCB2ZWMzKHAyKSxcclxuICAgIHZlYzMocDApLCB2ZWMzKHAyKSwgdmVjMyhwMyksXHJcbiAgICB2ZWMzKHAwKSwgdmVjMyhwMyksIHZlYzMocDQpLFxyXG4gICAgdmVjMyhwMCksIHZlYzMocDQpLCB2ZWMzKHA1KSxcclxuICBdXHJcbn1cclxuIiwiaW1wb3J0IHsgcmVuZGVyT2JqZWN0IH0gZnJvbSBcIi4vcmVuZGVyL3JlbmRfZGVmLmpzXCI7XHJcbmltcG9ydCB7IG1hdGVyaWFsUGF0dGVybiB9IGZyb20gXCIuL3JlbmRlci9yZXMvbWF0ZXJpYWxfcGF0dGVybi5qc1wiO1xyXG5pbXBvcnQgeyBwcmltIH0gZnJvbSBcIi4vcmVuZGVyL3Jlcy9wcmltLmpzXCI7XHJcbmltcG9ydCB7IHNoYWRlciB9IGZyb20gXCIuL3JlbmRlci9yZXMvc2hhZGVycy5qc1wiO1xyXG5pbXBvcnQgeyB2ZWMzIH0gZnJvbSBcIi4vbWF0aC92ZWMzLmpzXCI7XHJcbmltcG9ydCB7IFBsYXRvbiB9IGZyb20gXCIuL3JlbmRlci9yZXMvZmlndXJlcy5qc1wiO1xyXG5cclxuZnVuY3Rpb24gbWFpbigpIHtcclxuICBsZXQgXHJcbiAgICB0cnVuY0ljb1JuZCxcclxuICAgIHRldHJSbmQsXHJcbiAgICBjdWJlUm5kLFxyXG4gICAgb2N0Um5kLFxyXG4gICAgZG9kZWNSbmQsXHJcbiAgICBpY29SbmQ7XHJcbiAgXHJcbiAgbGV0IFxyXG4gICAgdHJ1bmNJY29NdGxQdG4sXHJcbiAgICB0ZXRyTXRuUHRuLFxyXG4gICAgY3ViZU10bFB0bixcclxuICAgIG9jdE10bFB0bixcclxuICAgIGRvZGVjTXRsUHRuLFxyXG4gICAgaWNvTXRsUHRuO1xyXG4gIFxyXG4gIGxldCBcclxuICAgIHRydW5jSWNvUHJpbSxcclxuICAgIHRldHJQcmltLFxyXG4gICAgY3ViZVByaW0sXHJcbiAgICBvY3RQcmltLFxyXG4gICAgZG9kZWNQcmltLFxyXG4gICAgaWNvUHJpbTtcclxuXHJcbiAgdHJ1bmNJY29SbmQgPSByZW5kZXJPYmplY3QoXCJjYW4wXCIpO1xyXG4gIHRldHJSbmQgPSByZW5kZXJPYmplY3QoXCJjYW41XCIpO1xyXG4gIGN1YmVSbmQgPSByZW5kZXJPYmplY3QoXCJjYW4xXCIpO1xyXG4gIG9jdFJuZCA9IHJlbmRlck9iamVjdChcImNhbjJcIik7XHJcbiAgZG9kZWNSbmQgPSByZW5kZXJPYmplY3QoXCJjYW4zXCIpO1xyXG4gIGljb1JuZCA9IHJlbmRlck9iamVjdChcImNhbjRcIik7XHJcbiBcclxuICBcclxuICB0cnVuY0ljb1JuZC5tYWluQ2FtLnNldCh2ZWMzKDAsIDAsIDMpLCB2ZWMzKDAsIDAsIDApLCB2ZWMzKDAsIDEsIDApKTtcclxuICB0cnVuY0ljb1JuZC5tYWluQ2FtLnNldFNpemUoMTAwMCwgMTAwMCk7XHJcbiAgdGV0clJuZC5tYWluQ2FtLnNldCh2ZWMzKDAsIDAsIDMpLCB2ZWMzKDAsIDAsIDApLCB2ZWMzKDAsIDEsIDApKTtcclxuICB0ZXRyUm5kLm1haW5DYW0uc2V0U2l6ZSg1MDAsIDUwMCk7XHJcbiAgY3ViZVJuZC5tYWluQ2FtLnNldCh2ZWMzKDAsIDAsIDMpLCB2ZWMzKDAsIDAsIDApLCB2ZWMzKDAsIDEsIDApKTtcclxuICBjdWJlUm5kLm1haW5DYW0uc2V0U2l6ZSg1MDAsIDUwMCk7XHJcbiAgb2N0Um5kLm1haW5DYW0uc2V0KHZlYzMoMCwgMCwgMyksIHZlYzMoMCwgMCwgMCksIHZlYzMoMCwgMSwgMCkpO1xyXG4gIG9jdFJuZC5tYWluQ2FtLnNldFNpemUoNTAwLCA1MDApO1xyXG4gIGRvZGVjUm5kLm1haW5DYW0uc2V0KHZlYzMoMCwgMCwgMyksIHZlYzMoMCwgMCwgMCksIHZlYzMoMCwgMSwgMCkpO1xyXG4gIGRvZGVjUm5kLm1haW5DYW0uc2V0U2l6ZSg1MDAsIDUwMCk7XHJcbiAgaWNvUm5kLm1haW5DYW0uc2V0KHZlYzMoMCwgMCwgMyksIHZlYzMoMCwgMCwgMCksIHZlYzMoMCwgMSwgMCkpO1xyXG4gIGljb1JuZC5tYWluQ2FtLnNldFNpemUoNTAwLCA1MDApO1xyXG5cclxuICB0cnVuY0ljb010bFB0biA9IG1hdGVyaWFsUGF0dGVybihcInRydW5jSWNvXCIsIFwiZGVmYXVsdFwiLCB0cnVuY0ljb1JuZCk7XHJcbiAgdGV0ck10blB0biA9IG1hdGVyaWFsUGF0dGVybihcInRldHJcIiwgXCJkZWZhdWx0XCIsIHRldHJSbmQpO1xyXG4gIGN1YmVNdGxQdG4gPSBtYXRlcmlhbFBhdHRlcm4oXCJjdWJlXCIsIFwiZGVmYXVsdFwiLCBjdWJlUm5kKTtcclxuICBvY3RNdGxQdG4gPSBtYXRlcmlhbFBhdHRlcm4oXCJvY3RcIiwgXCJkZWZhdWx0XCIsIG9jdFJuZCk7XHJcbiAgZG9kZWNNdGxQdG4gPSBtYXRlcmlhbFBhdHRlcm4oXCJkb2RlY1wiLCBcImRlZmF1bHRcIiwgZG9kZWNSbmQpO1xyXG4gIGljb010bFB0biA9IG1hdGVyaWFsUGF0dGVybihcImljb1wiLCBcImRlZmF1bHRcIiwgaWNvUm5kKTtcclxuXHJcbiAgY29uc3QgZHJhdyA9ICgpID0+IHtcclxuICAgIC8vIGRyYXdpbmdcclxuICAgIHRydW5jSWNvUm5kLmRyYXdGcmFtZSgpO1xyXG4gICAgdGV0clJuZC5kcmF3RnJhbWUoKTtcclxuICAgIGN1YmVSbmQuZHJhd0ZyYW1lKCk7XHJcbiAgICBvY3RSbmQuZHJhd0ZyYW1lKCk7XHJcbiAgICBkb2RlY1JuZC5kcmF3RnJhbWUoKTtcclxuICAgIGljb1JuZC5kcmF3RnJhbWUoKTtcclxuXHJcbiAgICB0cnVuY0ljb1JuZC5kcmF3UHJpbSh0cnVuY0ljb1ByaW0pO1xyXG4gICAgdGV0clJuZC5kcmF3UHJpbSh0ZXRyUHJpbSk7XHJcbiAgICBjdWJlUm5kLmRyYXdQcmltKGN1YmVQcmltKTtcclxuICAgIG9jdFJuZC5kcmF3UHJpbShvY3RQcmltKTtcclxuICAgIGRvZGVjUm5kLmRyYXdQcmltKGRvZGVjUHJpbSk7XHJcbiAgICBpY29SbmQuZHJhd1ByaW0oaWNvUHJpbSk7XHJcbiAgICAvLyBhbmltYXRpb24gcmVnaXN0ZXJcclxuICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZHJhdyk7XHJcbiAgICB9O1xyXG5cclxuICB0cnVuY0ljb010bFB0bi5zaGQuY3JlYXRlKCkudGhlbigoKSA9PiB7XHJcbiAgICB0cnVuY0ljb1ByaW0gPSBQbGF0b24udHJ1bmNlZEljb0NyZWF0ZSh0cnVuY0ljb010bFB0biwgMSk7XHJcbiAgICBjdWJlTXRsUHRuLnNoZC5jcmVhdGUoKS50aGVuKCgpID0+IHtcclxuICAgICAgY3ViZVByaW0gPSBQbGF0b24uY3ViZUNyZWF0ZShjdWJlTXRsUHRuLCAwLjUpO1xyXG4gICAgICBvY3RNdGxQdG4uc2hkLmNyZWF0ZSgpLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgIG9jdFByaW0gPSBQbGF0b24ub2N0Q3JlYXRlKG9jdE10bFB0biwgMSk7XHJcbiAgICAgICAgZG9kZWNNdGxQdG4uc2hkLmNyZWF0ZSgpLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgZG9kZWNQcmltID0gUGxhdG9uLmRvZGVjQ3JlYXRlKGRvZGVjTXRsUHRuLCAxKTtcclxuICAgICAgICAgIGljb010bFB0bi5zaGQuY3JlYXRlKCkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgIGljb1ByaW0gPSBQbGF0b24uaWNvQ3JlYXRlKGljb010bFB0biwgMSk7XHJcbiAgICAgICAgICAgIHRldHJNdG5QdG4uc2hkLmNyZWF0ZSgpLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgIHRldHJQcmltID0gUGxhdG9uLnRldHJDcmVhdGUodGV0ck10blB0biwgMik7XHJcbiAgICAgICAgICAgICAgZHJhdygpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgfSlcclxuICAgICAgICB9KVxyXG4gICAgICB9KVxyXG4gICAgfSlcclxuICB9KVxyXG59IFxyXG5cclxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsICgpID0+IHtcclxuICBtYWluKCk7XHJcbn0pO1xyXG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0VBQUEsTUFBTSxLQUFLLENBQUM7RUFDWixFQUFFLENBQUM7RUFDSCxFQUFFO0VBQ0YsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztFQUNoQixJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0VBQ2hCLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7RUFDaEIsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztFQUNoQixHQUFHLENBQUM7RUFDSjtFQUNBLEVBQUUsV0FBVyxDQUFDLEdBQUcsSUFBSSxFQUFFO0VBQ3ZCLElBQUksSUFBSSxJQUFJLENBQUMsTUFBTSxJQUFJLENBQUMsS0FBSyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLE9BQU8sSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLFFBQVE7RUFDcEYsTUFBTSxJQUFJLENBQUMsQ0FBQztFQUNaLE1BQU07RUFDTixRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3hELFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDeEQsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztFQUMxRCxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0VBQzVELE9BQU8sQ0FBQztFQUNSO0VBQ0E7RUFDQTtFQUNBLFNBQVMsSUFBSSxJQUFJLENBQUMsTUFBTSxJQUFJLENBQUMsSUFBSSxPQUFPLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxRQUFRLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUN0RixNQUFNLElBQUksQ0FBQyxDQUFDO0VBQ1osTUFBTTtFQUNOLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzVFLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzVFLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzVFLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzVFLE9BQU8sQ0FBQztFQUNSLFNBQVMsSUFBSSxJQUFJLENBQUMsTUFBTSxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxJQUFJLENBQUMsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFO0VBQ25GLE1BQU0sS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUU7RUFDaEMsUUFBUSxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRTtFQUNsQyxVQUFVLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3ZDLEtBQUssTUFBTSxJQUFJLElBQUksQ0FBQyxNQUFNLElBQUksQ0FBQyxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUU7RUFDM0QsTUFBTSxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRTtFQUNoQyxRQUFRLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFO0VBQ2xDLFVBQVUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEMsS0FBSyxNQUFNLElBQUksSUFBSSxDQUFDLE1BQU0sSUFBSSxFQUFFLEVBQUU7RUFDbEMsUUFBUSxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRTtFQUNsQyxVQUFVLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFO0VBQ3BDLFlBQVksSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztFQUMzQyxLQUFLLE1BQU0sSUFBSSxJQUFJLENBQUMsTUFBTSxJQUFJLENBQUMsSUFBSSxPQUFPLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxRQUFRLEVBQUU7RUFDL0QsUUFBUSxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRTtFQUNsQyxVQUFVLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFO0VBQ3BDLFlBQVksSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDbkMsS0FBSztFQUNMLEdBQUc7QUFDSDtFQUNBLEVBQUUsV0FBVyxHQUFHO0VBQ2hCLElBQUksSUFBSSxDQUFDLENBQUM7RUFDVixJQUFJO0VBQ0osTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztFQUNsQixNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0VBQ2xCLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7RUFDbEIsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztFQUNsQixLQUFLLENBQUM7RUFDTixHQUFHO0FBQ0g7RUFDQSxFQUFFLFFBQVEsR0FBRztFQUNiLElBQUksT0FBTyxJQUFJLEtBQUssRUFBRSxDQUFDO0VBQ3ZCLEdBQUc7QUFDSDtFQUNBLEVBQUUsTUFBTSxHQUFHO0VBQ1gsSUFBSSxPQUFPLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNoRix3Q0FBd0MsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2hGLHdDQUF3QyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNqRixVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2hGLHdDQUF3QyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDaEYsd0NBQXdDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2pGLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDaEYsd0NBQXdDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNoRix3Q0FBd0MsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDakYsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNoRix3Q0FBd0MsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2hGLHdDQUF3QyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2xGLEdBQUc7QUFDSDtFQUNBLEVBQUUsWUFBWSxDQUFDLENBQUMsRUFBRTtFQUNsQixJQUFJLElBQUksQ0FBQyxDQUFDO0VBQ1YsSUFBSTtFQUNKLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7RUFDbEIsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztFQUNsQixNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0VBQ2xCLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7RUFDeEIsS0FBSyxDQUFDO0VBQ04sR0FBRztBQUNIO0VBQ0EsRUFBRSxTQUFTLENBQUMsQ0FBQyxFQUFFO0VBQ2YsSUFBSSxPQUFPLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztFQUM1QixnQkFBZ0IsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7RUFDNUIsZ0JBQWdCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0VBQzVCLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEMsR0FBRztBQUNIO0VBQ0EsRUFBRSxPQUFPLENBQUMsQ0FBQztFQUNYLEVBQUU7RUFDRixJQUFJLElBQUksQ0FBQyxHQUFHLElBQUksRUFBRSxDQUFDO0FBQ25CO0VBQ0EsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUM5RixNQUFNLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUMvQjtFQUNBLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDOUYsTUFBTSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDL0I7RUFDQSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzlGLE1BQU0sSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQy9CO0VBQ0EsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUM5RixNQUFNLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUMvQjtBQUNBO0VBQ0EsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUM5RixNQUFNLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUMvQjtFQUNBLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDOUYsTUFBTSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDL0I7RUFDQSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzlGLE1BQU0sSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQy9CO0VBQ0EsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUM5RixNQUFNLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUMvQjtBQUNBO0VBQ0EsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUM5RixNQUFNLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUMvQjtFQUNBLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDOUYsTUFBTSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDL0I7RUFDQSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzlGLE1BQU0sSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQy9CO0VBQ0EsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUM5RixNQUFNLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUMvQjtBQUNBO0VBQ0EsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUM5RixNQUFNLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUMvQjtFQUNBLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDOUYsTUFBTSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDL0I7RUFDQSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzlGLE1BQU0sSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQy9CO0VBQ0EsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUM5RixNQUFNLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUMvQjtFQUNBLElBQUksT0FBTyxDQUFDLENBQUM7RUFDYixHQUFHO0FBQ0g7RUFDQSxFQUFFLE9BQU8sR0FBRztFQUNaLElBQUksSUFBSSxDQUFDLEdBQUcsSUFBSSxFQUFFLENBQUM7RUFDbkIsSUFBSSxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7QUFDNUI7RUFDQSxJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7RUFDaEIsTUFBTSxPQUFPO0FBQ2I7RUFDQTtFQUNBLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDYixNQUFNLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUM3RCxxQkFBcUIsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzdELHFCQUFxQixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztBQUNyRTtFQUNBLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDYixNQUFNLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUM3RCxxQkFBcUIsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzdELHFCQUFxQixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztBQUNyRTtFQUNBLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDYixNQUFNLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUM3RCxxQkFBcUIsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzdELHFCQUFxQixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztBQUNyRTtFQUNBLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDYixNQUFNLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUM3RCxxQkFBcUIsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzdELHFCQUFxQixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztBQUNyRTtFQUNBLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDYixNQUFNLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUM3RCxxQkFBcUIsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzdELHFCQUFxQixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztBQUNyRTtFQUNBLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDYixNQUFNLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUM3RCxxQkFBcUIsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzdELHFCQUFxQixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztBQUNyRTtFQUNBLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDYixNQUFNLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUM3RCxxQkFBcUIsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzdELHFCQUFxQixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztBQUNyRTtFQUNBLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDYixNQUFNLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUM3RCxxQkFBcUIsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzdELHFCQUFxQixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztBQUNyRTtBQUNBO0VBQ0EsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNiLE1BQU0sQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzdELHFCQUFxQixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDN0QscUJBQXFCLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO0FBQ3JFO0VBQ0EsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNiLE1BQU0sQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzdELHFCQUFxQixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDN0QscUJBQXFCLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO0FBQ3JFO0VBQ0EsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNiLE1BQU0sQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzdELHFCQUFxQixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDN0QscUJBQXFCLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO0FBQ3JFO0VBQ0EsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNiLE1BQU0sQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzdELHFCQUFxQixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDN0QscUJBQXFCLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO0FBQ3JFO0FBQ0E7RUFDQSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2IsTUFBTSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDN0QscUJBQXFCLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUM3RCxxQkFBcUIsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7QUFDckU7RUFDQSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2IsTUFBTSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDN0QscUJBQXFCLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUM3RCxxQkFBcUIsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7QUFDckU7RUFDQSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2IsTUFBTSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDN0QscUJBQXFCLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUM3RCxxQkFBcUIsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7QUFDckU7RUFDQSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2IsTUFBTSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDN0QscUJBQXFCLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUM3RCxxQkFBcUIsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7QUFDckU7RUFDQSxJQUFJLE9BQU8sQ0FBQyxDQUFDO0VBQ2IsR0FBRztBQUNIO0VBQ0EsRUFBRSxVQUFVLEdBQUc7RUFDZixJQUFJLElBQUksQ0FBQyxHQUFHLElBQUksRUFBRSxDQUFDO0VBQ25CLElBQUksSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO0FBQzVCO0VBQ0EsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO0VBQ2hCLE1BQU0sSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO0FBQ3pCO0VBQ0E7RUFDQSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2IsTUFBTSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDN0QscUJBQXFCLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUM3RCxxQkFBcUIsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7QUFDckU7RUFDQSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2IsTUFBTSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDN0QscUJBQXFCLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUM3RCxxQkFBcUIsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7QUFDckU7RUFDQSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2IsTUFBTSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDN0QscUJBQXFCLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUM3RCxxQkFBcUIsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7QUFDckU7RUFDQSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2IsTUFBTSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDN0QscUJBQXFCLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUM3RCxxQkFBcUIsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7QUFDckU7RUFDQSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2IsTUFBTSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDN0QscUJBQXFCLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUM3RCxxQkFBcUIsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7QUFDckU7RUFDQSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2IsTUFBTSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDN0QscUJBQXFCLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUM3RCxxQkFBcUIsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7QUFDckU7RUFDQSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2IsTUFBTSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDN0QscUJBQXFCLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUM3RCxxQkFBcUIsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7QUFDckU7RUFDQSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2IsTUFBTSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDN0QscUJBQXFCLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUM3RCxxQkFBcUIsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7QUFDckU7QUFDQTtFQUNBLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDYixNQUFNLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUM3RCxxQkFBcUIsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzdELHFCQUFxQixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztBQUNyRTtFQUNBLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDYixNQUFNLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUM3RCxxQkFBcUIsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzdELHFCQUFxQixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztBQUNyRTtFQUNBLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDYixNQUFNLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUM3RCxxQkFBcUIsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzdELHFCQUFxQixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztBQUNyRTtFQUNBLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDYixNQUFNLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUM3RCxxQkFBcUIsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzdELHFCQUFxQixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztBQUNyRTtBQUNBO0VBQ0EsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNiLE1BQU0sQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzdELHFCQUFxQixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDN0QscUJBQXFCLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO0FBQ3JFO0VBQ0EsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNiLE1BQU0sQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzdELHFCQUFxQixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDN0QscUJBQXFCLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO0FBQ3JFO0VBQ0EsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNiLE1BQU0sQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzdELHFCQUFxQixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDN0QscUJBQXFCLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO0FBQ3JFO0VBQ0EsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNiLE1BQU0sQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzdELHFCQUFxQixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDN0QscUJBQXFCLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO0FBQ3JFO0VBQ0EsSUFBSSxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRTtFQUM5QixNQUFNLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFO0VBQ2pDLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2pDLEdBQUc7QUFDSDtFQUNBLEVBQUUsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDLEVBQUU7RUFDbkIsSUFBSSxJQUFJLENBQUMsR0FBRyxLQUFLLEdBQUcsSUFBSSxDQUFDLEVBQUUsR0FBRyxHQUFHLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDcEU7RUFDQSxJQUFJLE9BQU8sSUFBSTtFQUNmLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUM7RUFDaEcsUUFBUSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQztFQUNoRyxRQUFRLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDO0VBQ2hHLFFBQVEsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7RUFDcEIsR0FBRztBQUNIO0VBQ0EsRUFBRSxTQUFTLENBQUMsS0FBSyxFQUFFLENBQUMsRUFBRTtFQUN0QixJQUFJLElBQUksQ0FBQyxHQUFHLEtBQUssR0FBRyxJQUFJLENBQUMsRUFBRSxHQUFHLEdBQUcsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNwRTtFQUNBLElBQUksSUFBSSxDQUFDLENBQUM7RUFDVixJQUFJO0VBQ0osTUFBTSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUM7RUFDaEcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUM7RUFDaEcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7RUFDaEcsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztFQUNsQixLQUFLLENBQUM7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QUFNLEtBQUssR0FBRyxHQUFHLE1BQU0sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLEdBQUcsSUFBSSxLQUFLLEdBQUcsR0FBRyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztFQUN4SCxpQkFBaUIsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxHQUFHLElBQUksR0FBRyxHQUFHLEtBQUssR0FBRyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7RUFDaEUsR0FBRztBQUNIO0VBQ0EsRUFBRSxVQUFVLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUU7RUFDbEQsSUFBSSxJQUFJLENBQUMsQ0FBQztFQUNWLElBQUk7RUFDSixNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxLQUFLLEtBQUssR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztFQUM1QyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLElBQUksS0FBSyxHQUFHLEdBQUcsTUFBTSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztFQUM1QyxNQUFNLENBQUMsQ0FBQyxLQUFLLEdBQUcsSUFBSSxLQUFLLEtBQUssR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLEdBQUcsR0FBRyxNQUFNLEtBQUssR0FBRyxHQUFHLE1BQU0sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLEdBQUcsSUFBSSxLQUFLLEdBQUcsR0FBRyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFO0VBQ2hILE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEdBQUcsSUFBSSxHQUFHLEdBQUcsS0FBSyxHQUFHLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7RUFDckQsS0FBSyxDQUFDO0VBQ04sR0FBRztBQUNIO0VBQ0EsRUFBRSxTQUFTLEdBQUc7RUFDZCxJQUFJLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3RFLE1BQU0sSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDNUQsTUFBTSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUM1RCxNQUFNLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUM5RCxHQUFHO0FBQ0g7RUFDQSxFQUFFLFlBQVksR0FBRztFQUNqQixJQUFJLElBQUksQ0FBQyxDQUFDO0VBQ1YsSUFBSTtFQUNKLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzlELE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzlELE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzlELE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzlELEtBQUssQ0FB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QUFJLEdBQUcsR0FBRyxNQUFNLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQztFQUMzQyxnQkFBZ0IsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQztFQUMxQyxnQkFBZ0IsRUFBRSxLQUFLLEdBQUcsSUFBSSxDQUFDLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxFQUFFLEVBQUUsR0FBRyxHQUFHLE1BQU0sQ0FBQyxJQUFJLEdBQUcsR0FBRyxNQUFNLENBQUMsRUFBRSxFQUFFLEdBQUcsR0FBRyxJQUFJLENBQUMsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7RUFDckgsR0FBRztBQUNIO0VBQ0EsRUFBRSxRQUFRLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxHQUFHO0VBQzlDLEVBQUU7RUFDRixJQUFJLElBQUksQ0FBQyxDQUFDO0VBQ1YsSUFBSTtFQUNKLE1BQU0sQ0FBQyxDQUFDLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0VBQ25DLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLEdBQUcsR0FBRyxNQUFNLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0VBQ25DLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7RUFDbEMsTUFBTSxDQUFDLEVBQUUsS0FBSyxHQUFHLElBQUksQ0FBQyxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsRUFBRSxFQUFFLEdBQUcsR0FBRyxNQUFNLENBQUMsSUFBSSxHQUFHLEdBQUcsTUFBTSxDQUFDLEVBQUUsRUFBRSxHQUFHLEdBQUcsSUFBSSxDQUFDLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztFQUMzRyxLQUFLLENBQUM7RUFDTixHQUFHO0FBQ0g7RUFDQSxFQUFFLE9BQU8sR0FBRztFQUNaLElBQUksT0FBTyxFQUFFLENBQUMsTUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2hDLEdBQUc7RUFDSCxDQUFDO0FBQ0Q7RUFDTyxTQUFTLElBQUksQ0FBQyxHQUFHLElBQUksRUFBRTtFQUM5QixFQUFFLE9BQU8sSUFBSSxLQUFLLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQztFQUM1QixDQUFDO0FBQ0Q7RUFDQSxTQUFTLGFBQWEsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUc7RUFDcEMsdUJBQXVCLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRztFQUNwQyx1QkFBdUIsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUU7RUFDdEMsRUFBRSxPQUFPLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRztFQUM1RCxTQUFTLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDO0VBQzdEOztFQ3poQkEsTUFBTSxLQUFLLENBQUM7RUFDWixFQUFFLENBQUMsQ0FBQztFQUNKLEVBQUUsQ0FBQyxDQUFDO0VBQ0osRUFBRSxDQUFDLENBQUM7QUFDSjtFQUNBLEVBQUUsV0FBVyxDQUFDLEdBQUcsSUFBSSxFQUFFO0VBQ3ZCLElBQUksSUFBSSxJQUFJLENBQUMsTUFBTSxLQUFLLENBQUM7RUFDekIsTUFBTSxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUMzRCxTQUFTLElBQUksT0FBTyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksUUFBUSxFQUFFO0VBQ3pDLE1BQU0sSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDakUsS0FBSyxNQUFNO0VBQ1gsTUFBTSxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUMzRCxLQUFLO0VBQ0wsR0FBRztBQUNIO0VBQ0E7RUFDQSxFQUFFLE1BQU0sQ0FBQyxHQUFHLEVBQUU7RUFDZCxJQUFJLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDLEdBQUcsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7RUFDMUQsR0FBRztBQUNIO0VBQ0E7RUFDQSxFQUFFLE1BQU0sQ0FBQyxHQUFHLEVBQUU7RUFDZCxJQUFJLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDLEdBQUcsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7RUFDMUQsR0FBRztBQUNIO0VBQ0E7RUFDQSxFQUFFLE1BQU0sQ0FBQyxHQUFHLEVBQUU7RUFDZCxJQUFJLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDLEdBQUcsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7RUFDMUQsR0FBRztBQUNIO0VBQ0E7RUFDQSxFQUFFLE1BQU0sQ0FBQyxHQUFHLEVBQUU7RUFDZCxJQUFJLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDLEdBQUcsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7RUFDMUQsR0FBRztBQUNIO0VBQ0E7RUFDQSxFQUFFLE1BQU0sQ0FBQyxHQUFHLEVBQUU7RUFDZCxJQUFJLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDaEUsR0FBRztBQUNIO0VBQ0E7RUFDQSxFQUFFLE1BQU0sQ0FBQyxHQUFHLEVBQUU7RUFDZCxJQUFJLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDaEUsR0FBRztBQUNIO0VBQ0E7RUFDQSxFQUFFLEdBQUcsQ0FBQyxHQUFHLEVBQUU7RUFDWCxJQUFJLE9BQU8sSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDM0MsR0FBRztBQUNIO0VBQ0E7RUFDQSxFQUFFLEdBQUcsQ0FBQyxHQUFHLEVBQUU7RUFDWCxJQUFJLE9BQU8sSUFBSSxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxD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SSxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3JGO0VBQ0EsSUFBSSxPQUFPLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztFQUM5RixrQkFBa0IsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7RUFDaEcsa0JBQWtCLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztFQUNsRyxHQUFHO0FBQ0g7RUFDQSxFQUFFLGNBQWMsQ0FBQyxDQUFDO0VBQ2xCLEVBQUU7RUFDRixJQUFJLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3hGLGNBQWMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDdEYsY0FBYyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENB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RyxRQUFRLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0VBQ3BELElBQUksSUFBSSxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQztFQUMvQyxJQUFJLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxFQUFFLENBQUM7QUFDNUI7RUFDQSxJQUFJLElBQUksQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLENBQUM7RUFDdkMsSUFBSSxNQUFNLElBQUksR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDO0VBQzVCLElBQUksSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxVQUFVLEVBQUUsR0FBRyxFQUFFO0VBQ3ZELFlBQVksSUFBSSxDQUFDLFVBQVUsRUFBRTtFQUM3QixZQUFZLElBQUksQ0FBQyxlQUFlLEVBQUUsR0FBRyxJQUFJLENBQUM7QUFDMUM7RUFDQSxJQUFJLElBQUksQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQzNDO0VBQ0EsR0FBRztBQUNIO0VBQ0EsRUFBRSxTQUFTLEdBQUc7RUFDZCxJQUFJLE1BQU0sSUFBSSxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7RUFDNUIsSUFBSSxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxVQUFVLEVBQUUsR0FBRyxFQUFFO0VBQ3RDLFlBQVksSUFBSSxDQUFDLFVBQVUsRUFBRTtFQUM3QixZQUFZLElBQUksQ0FBQyxlQUFlLEVBQUUsR0FBRyxJQUFJLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQztBQUMzRDtFQUNBLElBQUksSUFBSSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0VBQzVDLEdBQUc7QUFDSDtFQUNBLEVBQUUsUUFBUSxDQUFDLENBQUMsRUFBRTtFQUNkLElBQUksQ0FBQyxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLENBQUM7QUFDN0I7RUFDQTtFQUNBLElBQUksSUFBSSxFQUFFLEdBQUcsSUFBSSxFQUFFLENBQUMsTUFBTSxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUM7RUFDdEUsSUFBSSxJQUFJLElBQUksR0FBRyxFQUFFLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7RUFDL0MsSUFBSSxJQUFJLEtBQUssR0FBRyxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUMsU0FBUyxFQUFFLENBQUM7QUFDekM7RUFDQSxJQUFJLElBQUksQ0FBQyxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxJQUFJLFNBQVM7RUFDekQsTUFBTSxJQUFJLENBQUMsRUFBRSxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxHQUFHLEVBQUUsS0FBSyxFQUFFLElBQUksWUFBWSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUM7RUFDbEgsSUFBSSxJQUFJLENBQUMsQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsSUFBSSxTQUFTO0VBQ3ZELE1BQU0sSUFBSSxDQUFDLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxFQUFFLEtBQUssRUFBRSxJQUFJLFlBQVksQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDO0VBQzlHLElBQUksSUFBSSxDQUFDLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLElBQUksU0FBUztFQUMxRCxNQUFNLElBQUksQ0FBQyxFQUFFLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDLEdBQUcsRUFBRSxLQUFLLEVBQUUsSUFBSSxZQUFZLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQztFQUNwSCxJQUFJLElBQUksQ0FBQyxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLFNBQVM7RUFDdEQsTUFBTSxJQUFJLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUMxRTtFQUNBLElBQUksSUFBSSxDQUFDLEVBQUUsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0VBQzNDLElBQUksSUFBSSxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDO0VBQzdELElBQUksSUFBSSxDQUFDLENBQUMsV0FBVyxJQUFJLFNBQVMsRUFBRTtFQUNwQyxNQUFNLElBQUksQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsb0JBQW9CLEVBQUUsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0FBQ3RFO0VBQ0EsTUFBTSxJQUFJLENBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDLENBQUM7RUFDckUsS0FBSyxNQUFNO0VBQ1gsTUFBTSxJQUFJLENBQUMsRUFBRSxDQUFDLFVB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RUFBRSxHQUFHLFFBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7RUFDN0QsUUFBUSxJQUFJLEVBQUUsR0FBRyxRQUFRLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQzdEO0VBQ0EsUUFBUSxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0VBQzdCO0VBQ0EsUUFBUSxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3RELFFBQVEsUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLEdBQUcsUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzlELFFBQVEsUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLEdBQUcsUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQzlEO0VBQ0EsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO0VBQ2YsT0FBTztFQUNQLEtBQUssTUFBTTtFQUNYLE1BQU0sS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxNQUFNLElBQUk7RUFDNUMsUUFBUSxJQUFJLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxPQUFPLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLE9BQU8sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUU7RUFDOUUsVUFBVSxDQUFDLEVBQUUsQ0FBQztFQUNkLFVBQVUsU0FBUztFQUNuQixTQUFTO0FBQ1Q7RUFDQSxRQUFRLElBQUksRUFBRSxHQUFHLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7RUFDL0UsUUFBUSxJQUFJLEVBQUUsR0FBRyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQy9FO0VBQ0EsUUFBUSxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0VBQzdCO0VBQ0EsUUFBUSxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxHQUFHLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3hFLFFBQVEsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEdBQUcsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2hGLFFBQVEsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEdBQUcsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxD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QUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0VBQ3BDLE1BQU0sSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7RUFDbkMsS0FBSyxDQUFDO0VBQ047RUFDQSxJQUFJLElBQUksR0FBRyxHQUFHO0VBQ2QsTUFBTSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7RUFDYixNQUFNLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQztFQUNiLE1BQU0sQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDO0VBQ2IsTUFBTSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7RUFDYixNQUFNLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQztFQUNiLE1BQU0sQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDO0VBQ2IsTUFBTSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7RUFDYixNQUFNLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQztFQUNiLEtBQUssQ0FBQztFQUNOO0VBQ0EsSUFBSSxJQUFJLElBQUksR0FBRyxFQUFFLENBQUM7RUFHbEI7RUFDQSxJQUFJLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO0VBQ3pDLE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDbkQsS0FBSztFQUNMO0VBQ0EsSUFBSSxJQUFJLEdBQUcsTUFBTSxFQUFFLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO0VBQ3JDO0VBQ0EsSUFBSSxJQUFJLFNBQVMsR0FBRyxNQUFNLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztFQUNyRDtFQUNBLElBQUksT0FBTyxJQUFJLENBQUMsTUFBTSxFQUFFLFdBQVcsRUFBRSxTQUFTLENBQUMsQ0FBQztFQUNoRDtFQUNBLEdBQUc7RUFDSDtFQUNBLEVBQUUsT0FBTyxVQUFVLENBQUMsTUFBTSxFQUFFLElBQUksRUFBRTtFQUNsQyxJQUFJLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDL0IsSUFBSSxNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztFQUNwQztFQUNBLElBQUksSUFBSSxFQUFFLEdBQUc7RUFDYixNQUFNLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQztFQUN4RyxNQUFNLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDO0VBQ3JHLE1BQU0sTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQztFQUNqRyxNQUFNLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQztFQUNsRyxLQUFLLENBQUM7RUFDTjtFQUNBLElBQUksRUFBRSxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksS0FBSztFQUN6QixNQUFNLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7RUFDdkMsS0FBSyxFQUFDO0VBQ047RUFDQSxJQUFJLEVBQUUsR0FBRyxNQUFNLEVBQUUsQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLENBQUM7RUFDakM7RUFDQSxJQUFJLEVBQUUsR0FBRyxNQUFNLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQyxFQUFFLENBQUMsQ0FBQztFQUN4QztFQUNBLElBQUksT0FBTyxJQUFJLENBQUMsTUFBTSxFQUFFLFdBQVcsRUFBRSxFQUFFLENBQUMsQ0FBQztFQUN6QyxHQUFHO0VBQ0g7RUFDQSxFQUFFLE9BQU8sU0FBUyxDQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUU7RUFDakMsSUFDSyxNQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUVVO0VBQzNDO0VBQ0EsSUFBSSxJQUFJLElBQUksR0FBRztFQUNmLE1BQU0sSUFBSSxDQUFDLENBQUMsRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFDO0VBQ3pCLE1BQUs7RUFDTDtFQUNBLElBQUksS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtFQUNoQyxNQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxJQUFJLElBQUksQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxJQUFJLElBQUksQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2pHLEtBQUs7RUFDTDtFQUNBLElBQUksS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtFQUNoQyxNQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLElBQUksSUFBSSxDQUFDLEVBQUUsRUFBRSxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxJQUFJLElBQUksQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BHLEtBQUs7RUFDTDtFQUNBLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEM7RUFDQSxJQUFJLElBQUksR0FBRyxHQUFHO0VBQ2QsTUFBTSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7RUFDYixNQUFNLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQztFQUNiLE1BQU0sQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDO0VBQ2IsTUFBTSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7RUFDYixNQUFNLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQztFQUNiLE1BQU0sQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDO0VBQ2IsTUFBTSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7RUFDYixNQUFNLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQztFQUNkLE1BQU0sQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO0VBQ2QsTUFBTSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7RUFDZCxNQUFNLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQztFQUNiLE1BQU0sQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDO0VBQ2IsTUFBTSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7RUFDYixNQUFNLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQztFQUNiLE1BQU0sQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDO0VBQ2IsTUFBTSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUM7RUFDZCxNQUFNLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQztFQUNkLE1BQU0sRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDO0VBQ2QsTUFBTSxFQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUU7RUFDZixNQUFNLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQztFQUNmLEtBQUssQ0FBQztFQUNOO0VBQ0EsSUFBSSxJQUFJLElBQUksR0FBRyxFQUFFLENBQUM7RUFDbEI7RUFDQSxJQUFJLEtBQUssSUFBSSxDQUFDLElBQUksR0FBRyxFQUFFO0VBQ3ZCLE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDbkQsS0FBSztFQUNMO0VBQ0EsSUFBSSxNQUFNLEVBQUUsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7RUFDOUI7RUFDQSxJQUFJLElBQUksU0FBUyxHQUFHLE1BQU0sRUFBRSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxDQUFDO0VBQ3JEO0VBQ0EsSUFBSSxPQUFPLElBQUksQ0FBQyxNQUFNLEVBQUUsV0FBVyxFQUFFLFNBQVMsQ0FBQyxDQUFDO0VBQ2hELEdBQUc7RUFDSDtFQUNBLEVBQUUsT0FBTyxXQUFXLENBQUMsTUFBTSxFQUFFLElBQUksRUFBRTtFQUNuQyxJQUNLLE1BQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBRVU7RUFDM0M7RUFDQSxJQUFJLElBQUksS0FBSyxHQUFHO0VBQ2hCLE1BQU0sSUFBSSxDQUFDLENBQUMsRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFDO0VBQ3pCLE1BQUs7RUFDTDtFQUNBLElBQUksS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtFQUNoQyxNQUFNLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxJQUFJLElBQUksQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxJQUFJLElBQUksQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2xHLEtBQUs7RUFDTDtFQUNBLElBQUksS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtFQUNoQyxNQUFNLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLElBQUksSUFBSSxDQUFDLEVBQUUsRUFBRSxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxJQUFJLElBQUksQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3JHLEtBQUs7RUFDTDtFQUNBLElBQUksS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDckM7RUFDQSxJQUFJLElBQUksR0FBRyxHQUFHO0VBQ2QsTUFBTSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7RUFDYixNQUFNLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQztFQUNiLE1BQU0sQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDO0VBQ2IsTUFBTSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7RUFDYixNQUFNLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQztFQUNiLE1BQU0sQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDO0VBQ2IsTUFBTSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7RUFDYixNQUFNLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQztFQUNkLE1BQU0sQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO0VBQ2QsTUFBTSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7RUFDZCxNQUFNLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQztFQUNiLE1BQU0sQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDO0VBQ2IsTUFBTSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7RUFDYixNQUFNLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQztFQUNiLE1BQU0sQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDO0VBQ2IsTUFBTSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUM7RUFDZCxNQUFNLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQztFQUNkLE1BQU0sRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDO0VBQ2QsTUFBTSxFQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUU7RUFDZixNQUFNLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQztFQUNmLEtBQUssQ0FBQztFQUNOO0VBQ0EsSUFBSSxJQUFJLEtBQUssR0FBRyxFQUFFLENBQUM7RUFDbkI7RUFDQSxJQUFJLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUU7RUFDNUMsTUFBTSxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDOUYsS0FBSztFQUNMO0VBQ0EsSUFBSSxJQUFJLE9BQU8sR0FBRztFQUNsQixNQUFNLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQztFQUMvQixNQUFNLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQztFQUMvQixNQUFNLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQztFQUNqQyxNQUFNLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRTtFQUNwQyxNQUFNLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRTtFQUNwQyxNQUFNLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtFQUNoQyxNQUFNLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRTtFQUNsQyxNQUFNLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRTtFQUNyQyxNQUFNLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRTtFQUN4QyxNQUFNLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRTtFQUN0QyxNQUFNLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRTtFQUNsQyxNQUFNLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRTtFQUN4QyxNQUFLO0VBQ0w7RUFDQSxJQUFJLElBQUksSUFBSSxHQUFHLEVBQUUsQ0FBQztFQUNsQjtFQUNBLElBQUksS0FBSyxJQUFJLENBQUMsSUFBSSxPQUFPLEVBQUU7RUFDM0IsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUN4RCxLQUFLO0VBQ0w7RUFDQSxJQUFJLE1BQU0sRUFBRSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztFQUM5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QyxDQUFDLENBQUMsQ0FBQztBQUN4QjtFQUNBLElBQUksS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtFQUNoQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0VBQ2pDLEtBQUs7RUFDTDtFQUNBLElBQUksS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtFQUNoQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7RUFDOUIsS0FBSztBQUNMO0VBQ0EsSUFBSSxJQUFJLEtBQUssR0FBRyxFQUFFLENBQUM7QUFDbkI7RUFDQSxJQUFJLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUU7RUFDNUMsTUFBTSxLQUFLLENBQUMsSUFBSTtFQUNoQixRQUFRLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7RUFDM0UsUUFBUSxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0VBQzNFLE9BQU8sQ0FBQztFQUNSLEtBQUs7QUFDTDtFQUNBLElBQUksSUFBSSxXQUFXLEdBQUc7RUFDdEI7RUFDQSxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztFQUNyQjtFQUNBLE1BQU0sQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDO0VBQ3pCLE1BQU0sQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDO0VBQ3pCLE1BQU0sQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDO0VBQ3pCLE1BQU0sQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDO0VBQ3pCLE1BQU0sQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDO0VBQ3pCO0VBQ0EsTUFBTSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUM7RUFDMUIsTUFBTSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUM7RUFDMUIsTUFBTSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUM7RUFDMUIsTUFBTSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUM7RUFDMUIsTUFBTSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUM7RUFDMUI7RUFDQSxNQUFNLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQztFQUMxQixLQUFLLENBQUM7QUFDTjtFQUNBLElBQUksSUFBSSxVQUFVLEdBQUc7RUFDckI7RUFDQSxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7RUFDMUIsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0VBQzFCLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztFQUMxQixNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7RUFDMUIsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0VBQzFCO0VBQ0EsTUFBTSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDO0VBQzlCLE1BQU0sQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQztFQUM5QixNQUFNLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUM7RUFDOUIsTUFBTSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDO0VBQzlCLE1BQU0sQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQztFQUM5QixNQUFNLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUM7RUFDOUIsTUFBTSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDO0VBQzlCLE1BQU0sQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQztFQUM5QixNQUFNLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUM7RUFDOUIsTUFBTSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDO0VBQzlCO0VBQ0EsTUFBTSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDO0VBQzlCLE1BQU0sQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQztFQUM5QixNQUFNLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUM7RUFDOUIsTUFBTSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDO0VBQzlCLE1BQU0sQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQztFQUM5QixLQUFLLENBQUM7QUFDTjtFQUNBLElBQUksSUFBSSxLQUFLLEdBQUcsRUFBRSxDQUFDO0FBQ25CO0VBQ0EsSUFBSSxLQUFLLElBQUksQ0FBQyxJQUFJLFdBQVcsQ0FBQztFQUM5QixNQUFNLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxjQUFjO0VBQ2xDLFFBQVEsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNoQyxRQUFRLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDaEMsUUFBUSxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2hDLFFBQVEsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNoQyxRQUFRLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDbkMsS0FBSztBQUNMO0VBQ0EsSUFBSSxLQUFLLElBQUksQ0FBQyxJQUFJLFVBQVUsQ0FBQztFQUM3QixNQUFNLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxhQUFhO0VBQ2pDLFFBQVEsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUMvQixRQUFRLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDL0IsUUFBUSxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQy9CLFFBQVEsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUMvQixRQUFRLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDL0IsUUFBUSxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2xDLEtBQUs7QUFDTDtFQUNBLElBQUksSUFBSSxJQUFJLEdBQUcsRUFBRSxDQUFDO0FBQ2xCO0VBQ0EsSUFBSSxLQUFLLElBQUksQ0FBQyxJQUFJLEtBQUssRUFBRTtFQUN6QixNQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDbEMsS0FBSztBQUNMO0VBQ0EsSUFBSSxNQUFNLEVBQUUsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7RUFDOUI7RUFDQTtFQUNBLElBQUksSUFBSSxRQUFRLEdBQUcsTUFBTSxFQUFFLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDcEQ7RUFDQSxJQUFJLE9BQU8sSUFBSSxDQUFDLE1BQU0sRUFBRSxXQUFXLEVBQUUsUUFBUSxDQUFDLENBQUM7RUFDL0MsR0FBRztFQUNILENBQUM7QUFDRDtFQUNBLFNBQVMsY0FBYyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUU7RUFDNUMsRUFBRSxPQUFPO0VBQ1QsSUFBSSxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxFQUFFLENBQUM7RUFDaEMsSUFBSSxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxFQUFFLENBQUM7RUFDaEMsSUFBSSxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxFQUFFLENBQUM7RUFDaEMsR0FBRztFQUNILENBQUM7QUFDRDtFQUNBLFNBQVMsYUFBYSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFO0VBQy9DLEVBQUUsT0FBTztFQUNULElBQUksSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDO0VBQ2hDLElBQUksSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDO0VBQ2hDLElBQUksSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDO0VBQ2hDLElBQUksSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDO0VBQ2hDLEdBQUc7RUFDSDs7RUNwWUEsU0FBUyxJQUFJLEdBQUc7RUFDaEIsRUFBRTtFQUNGLElBQUksV0FBVztFQUNmLElBQUksT0FBTztFQUNYLElBQUksT0FBTztFQUNYLElBQUksTUFBTTtFQUNWLElBQUksUUFBUTtFQUNaLElBQUksTUFBTSxDQUFDO0VBQ1g7RUFDQSxFQUFFO0VBQ0YsSUFBSSxjQUFjO0VBQ2xCLElBQUksVUFBVTtFQUNkLElBQUksVUFBVTtFQUNkLElBQUksU0FBUztFQUNiLElBQUksV0FBVztFQUNmLElBQUksU0FBUyxDQUFDO0VBQ2Q7RUFDQSxFQUFFO0VBQ0YsSUFBSSxZQUFZO0VBQ2hCLElBQUksUUFBUTtFQUNaLElBQUksUUFBUTtFQUNaLElBQUksT0FBTztFQUNYLElBQUksU0FBUztFQUNiLElBQUksT0FBTyxDQUFDO0FBQ1o7RUFDQSxFQUFFLFdBQVcsR0FBRyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUM7RUFDckMsRUFBRSxPQUFPLEdBQUcsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0VBQ2pDLEVBQUUsT0FBTyxHQUFHLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQztFQUNqQyxFQUFFLE1BQU0sR0FBRyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUM7RUFDaEMsRUFBRSxRQUFRLEdBQUcsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0VBQ2xDLEVBQUUsTUFBTSxHQUFHLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQztFQUNoQztFQUNBO0VBQ0EsRUFBRSxXQUFXLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3ZFLEVBQUUsV0FBVyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0VBQzFDLEVBQUUsT0FBTyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNuRSxFQUFFLE9BQU8sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztFQUNwQyxFQUFFLE9BQU8sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDbkUsRUFBRSxPQUFPLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7RUFDcEMsRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2xFLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0VBQ25DLEVBQUUsUUFBUSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENB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
