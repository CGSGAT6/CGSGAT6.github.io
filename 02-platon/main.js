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
    vertexFormat;

    constructor(vertexFormat, name, shdName, rndObj) {
      this.name = name;
      this.vertexFormat = vertexFormat;
      this.shd = shader(shdName, rndObj);
    }
  }

  function materialPattern(vertexFormat, name, shdName, rndObj) {
    return new _materialPattern(vertexFormat, name, shdName, rndObj);
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
      else if (type == "triangle fun")
        this.type = mtlPtn.shd.glDrawingContext.TRIANGLE_FUN;
      else
        this.type = mtlPtn.shd.glDrawingContext.POINTS;
      
      const vertFormat = mtlPtn.vertexFormat;  
        /*

      let vertFormat = [
        {name : "Position",
         size : 12},
        {name : "Normal",
         size : 12}
        ];*/
      let vertSize = 24;

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
      this.pos = pos;

      if (norm == undefined)
        this.norm = vec3(0);
      else  
        this.norm = norm;
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

  function cubeCreate(mtlPtn, size) {
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

  function octCreate(mtlPtn, size) {
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

  function tetrCreate(mtlPtn, size) {
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

  function icoCreate(mtlPtn, size) {
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

  function dodecCreate(mtlPtn, size) {
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

  function main1() {
    let mainRnd;
    let fstMtlPtn;
    let fstPrim;


    mainRnd = renderObject("mainCanvas");
    
    mainRnd.mainCam.set(vec3(0, 0, 3), vec3(0, 0, 0), vec3(0, 1, 0));
    mainRnd.mainCam.setSize(1000, 1000);

    fstMtlPtn = materialPattern("fst", "default", mainRnd);

    const draw = () => {
      // drawing
      mainRnd.drawFrame();

      mainRnd.drawPrim(fstPrim);
      // animation register
      window.requestAnimationFrame(draw);
      };



    mainRnd.gl;

    // //prim(fstMtlPtn, "triangle strip", new Float32Array([1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0]))

    fstMtlPtn.shd.create().then(() => {fstPrim = cubeCreate(fstMtlPtn, 0.5);}).then(() => {
      draw();});
  } 

  function main2() {
    let mainRnd;
    let fstMtlPtn;
    let fstPrim;


    mainRnd = renderObject("secondCanvas");
    
    mainRnd.mainCam.set(vec3(0, 3, 3), vec3(0, 0, 0), vec3(0, 1, 0));
    mainRnd.mainCam.setSize(1000, 1000);

    fstMtlPtn = materialPattern("fst", "default", mainRnd);

    const draw = () => {
      // drawing
      mainRnd.drawFrame();

      mainRnd.drawPrim(fstPrim);
      // animation register
      window.requestAnimationFrame(draw);
      };



    mainRnd.gl;

    // //prim(fstMtlPtn, "triangle strip", new Float32Array([1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0]))

    fstMtlPtn.shd.create().then(() => {
      fstPrim = tetrCreate(fstMtlPtn, 2);
    }).then(() => {
      draw();});
  }

  function main3() {
    let mainRnd;
    let fstMtlPtn;
    let fstPrim;


    mainRnd = renderObject("thirdCanvas");
    
    mainRnd.mainCam.set(vec3(0, 0.8, 3), vec3(0, 0, 0), vec3(0, 1, 0));
    mainRnd.mainCam.setSize(1000, 1000);

    fstMtlPtn = materialPattern("fst", "default", mainRnd);

    const draw = () => {
      // drawing
      mainRnd.drawFrame();

      mainRnd.drawPrim(fstPrim);
      // animation register
      window.requestAnimationFrame(draw);
      };



    mainRnd.gl;

    // //prim(fstMtlPtn, "triangle strip", new Float32Array([1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0]))

    fstMtlPtn.shd.create().then(() => {fstPrim = octCreate(fstMtlPtn, 1);}).then(() => {
      draw();});
  }

  function main4() {
    let mainRnd;
    let fstMtlPtn;
    let fstPrim;


    mainRnd = renderObject("icoCanvas");
    
    mainRnd.mainCam.set(vec3(0, 3, 3), vec3(0, 0, 0), vec3(0, 1, 0));
    mainRnd.mainCam.setSize(1000, 1000);

    fstMtlPtn = materialPattern("fst", "default", mainRnd);

    const draw = () => {
      // drawing
      mainRnd.drawFrame();

      mainRnd.drawPrim(fstPrim);
      // animation register
      window.requestAnimationFrame(draw);
      };



    mainRnd.gl;

    // //prim(fstMtlPtn, "triangle strip", new Float32Array([1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0]))

    fstMtlPtn.shd.create().then(() => {fstPrim = icoCreate(fstMtlPtn, 1);}).then(() => {
      draw();});
  } 

  function main5() {
    let mainRnd;
    let fstMtlPtn;
    let fstPrim;


    mainRnd = renderObject("dodecCanvas");
    
    mainRnd.mainCam.set(vec3(0, 3, 3), vec3(0, 0, 0), vec3(0, 1, 0));
    mainRnd.mainCam.setSize(1000, 1000);

    fstMtlPtn = materialPattern("fst", "default", mainRnd);

    const draw = () => {
      // drawing
      mainRnd.drawFrame();

      mainRnd.drawPrim(fstPrim);
      // animation register
      window.requestAnimationFrame(draw);
      };



    mainRnd.gl;

    // //prim(fstMtlPtn, "triangle strip", new Float32Array([1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0]))

    fstMtlPtn.shd.create().then(() => {fstPrim = dodecCreate(fstMtlPtn, 1);}).then(() => {
      draw();});
  } 


  window.addEventListener("load", () => {
    main1();
    main2();
    main3();
    main4();
    main5();
  });

})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXMiOlsiLi4vbWF0aC9tYXQ0LmpzIiwiLi4vbWF0aC92ZWMzLmpzIiwiLi4vbWF0aC9jYW1lcmEuanMiLCIuLi9yZW5kZXIvcmVuZF9kZWYuanMiLCIuLi9yZW5kZXIvcmVzL3NoYWRlcnMuanMiLCIuLi9yZW5kZXIvcmVzL21hdGVyaWFsX3BhdHRlcm4uanMiLCIuLi9yZW5kZXIvcmVzL3ByaW0uanMiLCIuLi9yZW5kZXIvcmVzL3ZlcnRleC5qcyIsIi4uL3JlbmRlci9yZXMvZmlndXJlcy5qcyIsIi4uL21haW4uanMiXSwic291cmNlc0NvbnRlbnQiOlsiY2xhc3MgX21hdDQge1xyXG4gIG0gPSBcclxuICBbXHJcbiAgICBbMSwgMCwgMCwgMF0sXHJcbiAgICBbMCwgMSwgMCwgMF0sXHJcbiAgICBbMCwgMCwgMSwgMF0sXHJcbiAgICBbMCwgMCwgMCwgMV1cclxuICBdO1xyXG4gIFxyXG4gIGNvbnN0cnVjdG9yKC4uLmFyZ3MpIHtcclxuICAgIGlmIChhcmdzLmxlbmd0aCA9PSAxICYmICBBcnJheS5pc0FycmF5KGFyZ3NbMF0pICYmIHR5cGVvZiBhcmdzWzBdWzBdID09IFwibnVtYmVyXCIpXHJcbiAgICAgIHRoaXMubSA9IFxyXG4gICAgICBbXHJcbiAgICAgICAgW2FyZ3NbMF1bMF0sIGFyZ3NbMF1bMV0sIGFyZ3NbMF1bMl0sIGFyZ3NbMF1bM11dLFxyXG4gICAgICAgIFthcmdzWzBdWzRdLCBhcmdzWzBdWzVdLCBhcmdzWzBdWzZdLCBhcmdzWzBdWzddXSxcclxuICAgICAgICBbYXJnc1swXVs4XSwgYXJnc1swXVs5XSwgYXJnc1swXVsxMF0sIGFyZ3NbMF1bMTFdXSxcclxuICAgICAgICBbYXJnc1swXVsxMl0sIGFyZ3NbMF1bMTNdLCBhcmdzWzBdWzE0XSwgYXJnc1swXVsxNV1dXHJcbiAgICAgIF07XHJcbiAgICAgIC8qZm9yIChsZXQgaSA9IDA7IGkgPCA0OyBpKyspXHJcbiAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCA0OyBqKyspXHJcbiAgICAgICAgICB0aGlzLm1baV1bal0gPSBhcmdzWzBdW2kgKiA0ICsgal07Ki9cclxuICAgIGVsc2UgaWYgKGFyZ3MubGVuZ3RoID09IDEgJiYgdHlwZW9mIGFyZ3NbMF0gPT0gXCJvYmplY3RcIiAmJiAhQXJyYXkuaXNBcnJheShhcmdzWzBdKSlcclxuICAgICAgdGhpcy5tID0gXHJcbiAgICAgIFtcclxuICAgICAgICBbYXJnc1swXS5tWzBdWzBdLCBhcmdzWzBdLm1bMF1bMV0sIGFyZ3NbMF0ubVswXVsyXSwgYXJnc1swXS5tWzBdWzNdXSxcclxuICAgICAgICBbYXJnc1swXS5tWzFdWzBdLCBhcmdzWzBdLm1bMV1bMV0sIGFyZ3NbMF0ubVsxXVsyXSwgYXJnc1swXS5tWzFdWzNdXSxcclxuICAgICAgICBbYXJnc1swXS5tWzJdWzBdLCBhcmdzWzBdLm1bMl1bMV0sIGFyZ3NbMF0ubVsyXVsyXSwgYXJnc1swXS5tWzJdWzNdXSxcclxuICAgICAgICBbYXJnc1swXS5tWzNdWzBdLCBhcmdzWzBdLm1bM11bMV0sIGFyZ3NbMF0ubVszXVsyXSwgYXJnc1swXS5tWzNdWzNdXSxcclxuICAgICAgXTtcclxuICAgIGVsc2UgaWYgKGFyZ3MubGVuZ3RoID09IDEgJiYgYXJnc1swXS5sZW5ndGggPT0gNCAmJiBBcnJheS5pc0FycmF5KGFyZ3NbMF1bMF0pKSB7XHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNDsgaSsrKVxyXG4gICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgNDsgaisrKVxyXG4gICAgICAgICAgdGhpcy5tW2ldW2pdID0gYXJnc1swXVtpXVtqXTtcclxuICAgIH0gZWxzZSBpZiAoYXJncy5sZW5ndGggPT0gNCAmJiBBcnJheS5pc0FycmF5KGFyZ3NbMF0pKSB7XHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNDsgaSsrKVxyXG4gICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgNDsgaisrKVxyXG4gICAgICAgICAgdGhpcy5tW2ldW2pdID0gYXJnc1tpXVtqXTtcclxuICAgIH0gZWxzZSBpZiAoYXJncy5sZW5ndGggPT0gMTYpIHtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDQ7IGkrKylcclxuICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgNDsgaisrKVxyXG4gICAgICAgICAgICB0aGlzLm1baV1bal0gPSBhcmdzW2kgKiA0ICsgal07XHJcbiAgICB9IGVsc2UgaWYgKGFyZ3MubGVuZ3RoID09IDEgJiYgdHlwZW9mIGFyZ3NbMF0gPT0gXCJudW1iZXJcIikge1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNDsgaSsrKVxyXG4gICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCA0OyBqKyspXHJcbiAgICAgICAgICAgIHRoaXMubVtpXVtqXSA9IGFyZ3NbMF07XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBzZXRJZGVudGl0eSgpIHtcclxuICAgIHRoaXMubSA9IFxyXG4gICAgW1xyXG4gICAgICBbMSwgMCwgMCwgMF0sXHJcbiAgICAgIFswLCAxLCAwLCAwXSxcclxuICAgICAgWzAsIDAsIDEsIDBdLFxyXG4gICAgICBbMCwgMCwgMCwgMV1cclxuICAgIF07XHJcbiAgfVxyXG5cclxuICBpZGVudGl0eSgpIHtcclxuICAgIHJldHVybiBuZXcgX21hdDQoKTtcclxuICB9XHJcblxyXG4gIGRldGVybSgpIHtcclxuICAgIHJldHVybiB0aGlzLm1bMF1bMF0gKiBtYXRyRGV0ZXJtM3gzKHRoaXMubVsxXVsxXSwgdGhpcy5tWzFdWzJdLCB0aGlzLm1bMV1bM10sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1bMl1bMV0sIHRoaXMubVsyXVsyXSwgdGhpcy5tWzJdWzNdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tWzNdWzFdLCB0aGlzLm1bM11bMl0sIHRoaXMubVszXVszXSkgK1xyXG4gICAgICAgICAgLXRoaXMubVswXVsxXSAqIG1hdHJEZXRlcm0zeDModGhpcy5tWzFdWzBdLCB0aGlzLm1bMV1bMl0sIHRoaXMubVsxXVszXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubVsyXVswXSwgdGhpcy5tWzJdWzJdLCB0aGlzLm1bMl1bM10sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1bM11bMF0sIHRoaXMubVszXVsyXSwgdGhpcy5tWzNdWzNdKSArXHJcbiAgICAgICAgICArdGhpcy5tWzBdWzJdICogbWF0ckRldGVybTN4Myh0aGlzLm1bMV1bMF0sIHRoaXMubVsxXVsxXSwgdGhpcy5tWzFdWzNdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tWzJdWzBdLCB0aGlzLm1bMl1bMV0sIHRoaXMubVsyXVszXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubVszXVswXSwgdGhpcy5tWzNdWzFdLCB0aGlzLm1bM11bM10pICtcclxuICAgICAgICAgIC10aGlzLm1bMF1bM10gKiBtYXRyRGV0ZXJtM3gzKHRoaXMubVsxXVswXSwgdGhpcy5tWzFdWzFdLCB0aGlzLm1bMV1bMl0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1bMl1bMF0sIHRoaXMubVsyXVsxXSwgdGhpcy5tWzJdWzJdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tWzNdWzBdLCB0aGlzLm1bM11bMV0sIHRoaXMubVszXVsyXSk7XHJcbiAgfVxyXG5cclxuICBzZXRUcmFuc2xhdGUodikge1xyXG4gICAgdGhpcy5tID0gXHJcbiAgICBbXHJcbiAgICAgIFsxLCAwLCAwLCAwXSxcclxuICAgICAgWzAsIDEsIDAsIDBdLFxyXG4gICAgICBbMCwgMCwgMSwgMF0sXHJcbiAgICAgIFt2LngsIHYueSwgdi56LCAxXVxyXG4gICAgXTtcclxuICB9XHJcblxyXG4gIHRyYW5zbGF0ZSh2KSB7XHJcbiAgICByZXR1cm4gbWF0NChbMSwgMCwgMCwgMF0sXHJcbiAgICAgICAgICAgICAgICBbMCwgMSwgMCwgMF0sXHJcbiAgICAgICAgICAgICAgICBbMCwgMCwgMSwgMF0sXHJcbiAgICAgICAgICAgICAgICBbdi54LCB2LnksIHYueiwgMV0pO1xyXG4gIH1cclxuXHJcbiAgbXVsTWF0cihhKVxyXG4gIHtcclxuICAgIGxldCByID0gbWF0NCgpO1xyXG5cclxuICAgIHIubVswXVswXSA9IHRoaXMubVswXVswXSAqIGEubVswXVswXSArIHRoaXMubVswXVsxXSAqIGEubVsxXVswXSArIHRoaXMubVswXVsyXSAqIGEubVsyXVswXSArXHJcbiAgICAgIHRoaXMubVswXVszXSAqIGEubVszXVswXTtcclxuXHJcbiAgICByLm1bMF1bMV0gPSB0aGlzLm1bMF1bMF0gKiBhLm1bMF1bMV0gKyB0aGlzLm1bMF1bMV0gKiBhLm1bMV1bMV0gKyB0aGlzLm1bMF1bMl0gKiBhLm1bMl1bMV0gK1xyXG4gICAgICB0aGlzLm1bMF1bM10gKiBhLm1bM11bMV07XHJcblxyXG4gICAgci5tWzBdWzJdID0gdGhpcy5tWzBdWzBdICogYS5tWzBdWzJdICsgdGhpcy5tWzBdWzFdICogYS5tWzFdWzJdICsgdGhpcy5tWzBdWzJdICogYS5tWzJdWzJdICtcclxuICAgICAgdGhpcy5tWzBdWzNdICogYS5tWzNdWzJdO1xyXG5cclxuICAgIHIubVswXVszXSA9IHRoaXMubVswXVswXSAqIGEubVswXVszXSArIHRoaXMubVswXVsxXSAqIGEubVsxXVszXSArIHRoaXMubVswXVsyXSAqIGEubVsyXVszXSArXHJcbiAgICAgIHRoaXMubVswXVszXSAqIGEubVszXVszXTtcclxuXHJcblxyXG4gICAgci5tWzFdWzBdID0gdGhpcy5tWzFdWzBdICogYS5tWzBdWzBdICsgdGhpcy5tWzFdWzFdICogYS5tWzFdWzBdICsgdGhpcy5tWzFdWzJdICogYS5tWzJdWzBdICtcclxuICAgICAgdGhpcy5tWzFdWzNdICogYS5tWzNdWzBdO1xyXG5cclxuICAgIHIubVsxXVsxXSA9IHRoaXMubVsxXVswXSAqIGEubVswXVsxXSArIHRoaXMubVsxXVsxXSAqIGEubVsxXVsxXSArIHRoaXMubVsxXVsyXSAqIGEubVsyXVsxXSArXHJcbiAgICAgIHRoaXMubVsxXVszXSAqIGEubVszXVsxXTtcclxuXHJcbiAgICByLm1bMV1bMl0gPSB0aGlzLm1bMV1bMF0gKiBhLm1bMF1bMl0gKyB0aGlzLm1bMV1bMV0gKiBhLm1bMV1bMl0gKyB0aGlzLm1bMV1bMl0gKiBhLm1bMl1bMl0gK1xyXG4gICAgICB0aGlzLm1bMV1bM10gKiBhLm1bM11bMl07XHJcblxyXG4gICAgci5tWzFdWzNdID0gdGhpcy5tWzFdWzBdICogYS5tWzBdWzNdICsgdGhpcy5tWzFdWzFdICogYS5tWzFdWzNdICsgdGhpcy5tWzFdWzJdICogYS5tWzJdWzNdICtcclxuICAgICAgdGhpcy5tWzFdWzNdICogYS5tWzNdWzNdO1xyXG5cclxuXHJcbiAgICByLm1bMl1bMF0gPSB0aGlzLm1bMl1bMF0gKiBhLm1bMF1bMF0gKyB0aGlzLm1bMl1bMV0gKiBhLm1bMV1bMF0gKyB0aGlzLm1bMl1bMl0gKiBhLm1bMl1bMF0gK1xyXG4gICAgICB0aGlzLm1bMl1bM10gKiBhLm1bM11bMF07XHJcblxyXG4gICAgci5tWzJdWzFdID0gdGhpcy5tWzJdWzBdICogYS5tWzBdWzFdICsgdGhpcy5tWzJdWzFdICogYS5tWzFdWzFdICsgdGhpcy5tWzJdWzJdICogYS5tWzJdWzFdICtcclxuICAgICAgdGhpcy5tWzJdWzNdICogYS5tWzNdWzFdO1xyXG5cclxuICAgIHIubVsyXVsyXSA9IHRoaXMubVsyXVswXSAqIGEubVswXVsyXSArIHRoaXMubVsyXVsxXSAqIGEubVsxXVsyXSArIHRoaXMubVsyXVsyXSAqIGEubVsyXVsyXSArXHJcbiAgICAgIHRoaXMubVsyXVszXSAqIGEubVszXVsyXTtcclxuXHJcbiAgICByLm1bMl1bM10gPSB0aGlzLm1bMl1bMF0gKiBhLm1bMF1bM10gKyB0aGlzLm1bMl1bMV0gKiBhLm1bMV1bM10gKyB0aGlzLm1bMl1bMl0gKiBhLm1bMl1bM10gK1xyXG4gICAgICB0aGlzLm1bMl1bM10gKiBhLm1bM11bM107XHJcblxyXG5cclxuICAgIHIubVszXVswXSA9IHRoaXMubVszXVswXSAqIGEubVswXVswXSArIHRoaXMubVszXVsxXSAqIGEubVsxXVswXSArIHRoaXMubVszXVsyXSAqIGEubVsyXVswXSArXHJcbiAgICAgIHRoaXMubVszXVszXSAqIGEubVszXVswXTtcclxuXHJcbiAgICByLm1bM11bMV0gPSB0aGlzLm1bM11bMF0gKiBhLm1bMF1bMV0gKyB0aGlzLm1bM11bMV0gKiBhLm1bMV1bMV0gKyB0aGlzLm1bM11bMl0gKiBhLm1bMl1bMV0gK1xyXG4gICAgICB0aGlzLm1bM11bM10gKiBhLm1bM11bMV07XHJcblxyXG4gICAgci5tWzNdWzJdID0gdGhpcy5tWzNdWzBdICogYS5tWzBdWzJdICsgdGhpcy5tWzNdWzFdICogYS5tWzFdWzJdICsgdGhpcy5tWzNdWzJdICogYS5tWzJdWzJdICtcclxuICAgICAgdGhpcy5tWzNdWzNdICogYS5tWzNdWzJdO1xyXG5cclxuICAgIHIubVszXVszXSA9IHRoaXMubVszXVswXSAqIGEubVswXVszXSArIHRoaXMubVszXVsxXSAqIGEubVsxXVszXSArIHRoaXMubVszXVsyXSAqIGEubVsyXVszXSArXHJcbiAgICAgIHRoaXMubVszXVszXSAqIGEubVszXVszXTtcclxuXHJcbiAgICByZXR1cm4gcjtcclxuICB9XHJcblxyXG4gIGludmVyc2UoKSB7XHJcbiAgICBsZXQgciA9IG1hdDQoKTtcclxuICAgIGxldCBkZXQgPSB0aGlzLmRldGVybSgpO1xyXG5cclxuICAgIGlmIChkZXQgPT0gMClcclxuICAgICAgcmV0dXJuO1xyXG5cclxuICAgIC8qIGJ1aWxkIGFkam9pbnQgbWF0cml4ICovXHJcbiAgICByLm1bMF1bMF0gPVxyXG4gICAgICArbWF0ckRldGVybTN4Myh0aGlzLm1bMV1bMV0sIHRoaXMubVsxXVsyXSwgdGhpcy5tWzFdWzNdLFxyXG4gICAgICAgICAgICAgICAgICAgICB0aGlzLm1bMl1bMV0sIHRoaXMubVsyXVsyXSwgdGhpcy5tWzJdWzNdLFxyXG4gICAgICAgICAgICAgICAgICAgICB0aGlzLm1bM11bMV0sIHRoaXMubVszXVsyXSwgdGhpcy5tWzNdWzNdKSAvIGRldDtcclxuXHJcbiAgICByLm1bMV1bMF0gPVxyXG4gICAgICAtbWF0ckRldGVybTN4Myh0aGlzLm1bMV1bMF0sIHRoaXMubVsxXVsyXSwgdGhpcy5tWzFdWzNdLFxyXG4gICAgICAgICAgICAgICAgICAgICB0aGlzLm1bMl1bMF0sIHRoaXMubVsyXVsyXSwgdGhpcy5tWzJdWzNdLFxyXG4gICAgICAgICAgICAgICAgICAgICB0aGlzLm1bM11bMF0sIHRoaXMubVszXVsyXSwgdGhpcy5tWzNdWzNdKSAvIGRldDtcclxuXHJcbiAgICByLm1bMl1bMF0gPVxyXG4gICAgICArbWF0ckRldGVybTN4Myh0aGlzLm1bMV1bMF0sIHRoaXMubVsxXVsxXSwgdGhpcy5tWzFdWzNdLFxyXG4gICAgICAgICAgICAgICAgICAgICB0aGlzLm1bMl1bMF0sIHRoaXMubVsyXVsxXSwgdGhpcy5tWzJdWzNdLFxyXG4gICAgICAgICAgICAgICAgICAgICB0aGlzLm1bM11bMF0sIHRoaXMubVszXVsxXSwgdGhpcy5tWzNdWzNdKSAvIGRldDtcclxuXHJcbiAgICByLm1bM11bMF0gPVxyXG4gICAgICAtbWF0ckRldGVybTN4Myh0aGlzLm1bMV1bMF0sIHRoaXMubVsxXVsxXSwgdGhpcy5tWzFdWzJdLFxyXG4gICAgICAgICAgICAgICAgICAgICB0aGlzLm1bMl1bMF0sIHRoaXMubVsyXVsxXSwgdGhpcy5tWzJdWzJdLFxyXG4gICAgICAgICAgICAgICAgICAgICB0aGlzLm1bM11bMF0sIHRoaXMubVszXVsxXSwgdGhpcy5tWzNdWzJdKSAvIGRldDtcclxuXHJcbiAgICByLm1bMF1bMV0gPVxyXG4gICAgICAtbWF0ckRldGVybTN4Myh0aGlzLm1bMF1bMV0sIHRoaXMubVswXVsyXSwgdGhpcy5tWzBdWzNdLFxyXG4gICAgICAgICAgICAgICAgICAgICB0aGlzLm1bMl1bMV0sIHRoaXMubVsyXVsyXSwgdGhpcy5tWzJdWzNdLFxyXG4gICAgICAgICAgICAgICAgICAgICB0aGlzLm1bM11bMV0sIHRoaXMubVszXVsyXSwgdGhpcy5tWzNdWzNdKSAvIGRldDtcclxuXHJcbiAgICByLm1bMV1bMV0gPVxyXG4gICAgICArbWF0ckRldGVybTN4Myh0aGlzLm1bMF1bMF0sIHRoaXMubVswXVsyXSwgdGhpcy5tWzBdWzNdLFxyXG4gICAgICAgICAgICAgICAgICAgICB0aGlzLm1bMl1bMF0sIHRoaXMubVsyXVsyXSwgdGhpcy5tWzJdWzNdLFxyXG4gICAgICAgICAgICAgICAgICAgICB0aGlzLm1bM11bMF0sIHRoaXMubVszXVsyXSwgdGhpcy5tWzNdWzNdKSAvIGRldDtcclxuXHJcbiAgICByLm1bMl1bMV0gPVxyXG4gICAgICAtbWF0ckRldGVybTN4Myh0aGlzLm1bMF1bMF0sIHRoaXMubVswXVsxXSwgdGhpcy5tWzBdWzNdLFxyXG4gICAgICAgICAgICAgICAgICAgICB0aGlzLm1bMl1bMF0sIHRoaXMubVsyXVsxXSwgdGhpcy5tWzJdWzNdLFxyXG4gICAgICAgICAgICAgICAgICAgICB0aGlzLm1bM11bMF0sIHRoaXMubVszXVsxXSwgdGhpcy5tWzNdWzNdKSAvIGRldDtcclxuXHJcbiAgICByLm1bM11bMV0gPVxyXG4gICAgICArbWF0ckRldGVybTN4Myh0aGlzLm1bMF1bMF0sIHRoaXMubVswXVsxXSwgdGhpcy5tWzBdWzJdLFxyXG4gICAgICAgICAgICAgICAgICAgICB0aGlzLm1bMl1bMF0sIHRoaXMubVsyXVsxXSwgdGhpcy5tWzJdWzJdLFxyXG4gICAgICAgICAgICAgICAgICAgICB0aGlzLm1bM11bMF0sIHRoaXMubVszXVsxXSwgdGhpcy5tWzNdWzJdKSAvIGRldDtcclxuXHJcblxyXG4gICAgci5tWzBdWzJdID1cclxuICAgICAgK21hdHJEZXRlcm0zeDModGhpcy5tWzBdWzFdLCB0aGlzLm1bMF1bMl0sIHRoaXMubVswXVszXSxcclxuICAgICAgICAgICAgICAgICAgICAgdGhpcy5tWzFdWzFdLCB0aGlzLm1bMV1bMl0sIHRoaXMubVsxXVszXSxcclxuICAgICAgICAgICAgICAgICAgICAgdGhpcy5tWzNdWzFdLCB0aGlzLm1bM11bMl0sIHRoaXMubVszXVszXSkgLyBkZXQ7XHJcblxyXG4gICAgci5tWzFdWzJdID1cclxuICAgICAgLW1hdHJEZXRlcm0zeDModGhpcy5tWzBdWzBdLCB0aGlzLm1bMF1bMl0sIHRoaXMubVswXVszXSxcclxuICAgICAgICAgICAgICAgICAgICAgdGhpcy5tWzFdWzBdLCB0aGlzLm1bMV1bMl0sIHRoaXMubVsxXVszXSxcclxuICAgICAgICAgICAgICAgICAgICAgdGhpcy5tWzNdWzBdLCB0aGlzLm1bM11bMl0sIHRoaXMubVszXVszXSkgLyBkZXQ7XHJcblxyXG4gICAgci5tWzJdWzJdID1cclxuICAgICAgK21hdHJEZXRlcm0zeDModGhpcy5tWzBdWzBdLCB0aGlzLm1bMF1bMV0sIHRoaXMubVswXVszXSxcclxuICAgICAgICAgICAgICAgICAgICAgdGhpcy5tWzFdWzBdLCB0aGlzLm1bMV1bMV0sIHRoaXMubVsxXVszXSxcclxuICAgICAgICAgICAgICAgICAgICAgdGhpcy5tWzNdWzBdLCB0aGlzLm1bM11bMV0sIHRoaXMubVszXVszXSkgLyBkZXQ7XHJcblxyXG4gICAgci5tWzNdWzJdID1cclxuICAgICAgLW1hdHJEZXRlcm0zeDModGhpcy5tWzBdWzBdLCB0aGlzLm1bMF1bMV0sIHRoaXMubVswXVsyXSxcclxuICAgICAgICAgICAgICAgICAgICAgdGhpcy5tWzFdWzBdLCB0aGlzLm1bMV1bMV0sIHRoaXMubVsxXVsyXSxcclxuICAgICAgICAgICAgICAgICAgICAgdGhpcy5tWzNdWzBdLCB0aGlzLm1bM11bMV0sIHRoaXMubVszXVsyXSkgLyBkZXQ7XHJcblxyXG5cclxuICAgIHIubVswXVszXSA9XHJcbiAgICAgIC1tYXRyRGV0ZXJtM3gzKHRoaXMubVswXVsxXSwgdGhpcy5tWzBdWzJdLCB0aGlzLm1bMF1bM10sXHJcbiAgICAgICAgICAgICAgICAgICAgIHRoaXMubVsxXVsxXSwgdGhpcy5tWzFdWzJdLCB0aGlzLm1bMV1bM10sXHJcbiAgICAgICAgICAgICAgICAgICAgIHRoaXMubVsyXVsxXSwgdGhpcy5tWzJdWzJdLCB0aGlzLm1bMl1bM10pIC8gZGV0O1xyXG5cclxuICAgIHIubVsxXVszXSA9XHJcbiAgICAgICttYXRyRGV0ZXJtM3gzKHRoaXMubVswXVswXSwgdGhpcy5tWzBdWzJdLCB0aGlzLm1bMF1bM10sXHJcbiAgICAgICAgICAgICAgICAgICAgIHRoaXMubVsxXVswXSwgdGhpcy5tWzFdWzJdLCB0aGlzLm1bMV1bM10sXHJcbiAgICAgICAgICAgICAgICAgICAgIHRoaXMubVsyXVswXSwgdGhpcy5tWzJdWzJdLCB0aGlzLm1bMl1bM10pIC8gZGV0O1xyXG5cclxuICAgIHIubVsyXVszXSA9XHJcbiAgICAgIC1tYXRyRGV0ZXJtM3gzKHRoaXMubVswXVswXSwgdGhpcy5tWzBdWzFdLCB0aGlzLm1bMF1bM10sXHJcbiAgICAgICAgICAgICAgICAgICAgIHRoaXMubVsxXVswXSwgdGhpcy5tWzFdWzFdLCB0aGlzLm1bMV1bM10sXHJcbiAgICAgICAgICAgICAgICAgICAgIHRoaXMubVsyXVswXSwgdGhpcy5tWzJdWzFdLCB0aGlzLm1bMl1bM10pIC8gZGV0O1xyXG5cclxuICAgIHIubVszXVszXSA9XHJcbiAgICAgICttYXRyRGV0ZXJtM3gzKHRoaXMubVswXVswXSwgdGhpcy5tWzBdWzFdLCB0aGlzLm1bMF1bMl0sXHJcbiAgICAgICAgICAgICAgICAgICAgIHRoaXMubVsxXVswXSwgdGhpcy5tWzFdWzFdLCB0aGlzLm1bMV1bMl0sXHJcbiAgICAgICAgICAgICAgICAgICAgIHRoaXMubVsyXVswXSwgdGhpcy5tWzJdWzFdLCB0aGlzLm1bMl1bMl0pIC8gZGV0O1xyXG5cclxuICAgIHJldHVybiByO1xyXG4gIH1cclxuXHJcbiAgc2V0SW52ZXJzZSgpIHtcclxuICAgIGxldCByID0gbWF0NCgpO1xyXG4gICAgbGV0IGRldCA9IHRoaXMuZGV0ZXJtKCk7XHJcblxyXG4gICAgaWYgKGRldCA9PSAwKVxyXG4gICAgICB0aGlzLnNldElkZW50aXR5KCk7XHJcblxyXG4gICAgLyogYnVpbGQgYWRqb2ludCBtYXRyaXggKi9cclxuICAgIHIubVswXVswXSA9XHJcbiAgICAgICttYXRyRGV0ZXJtM3gzKHRoaXMubVsxXVsxXSwgdGhpcy5tWzFdWzJdLCB0aGlzLm1bMV1bM10sXHJcbiAgICAgICAgICAgICAgICAgICAgIHRoaXMubVsyXVsxXSwgdGhpcy5tWzJdWzJdLCB0aGlzLm1bMl1bM10sXHJcbiAgICAgICAgICAgICAgICAgICAgIHRoaXMubVszXVsxXSwgdGhpcy5tWzNdWzJdLCB0aGlzLm1bM11bM10pIC8gZGV0O1xyXG5cclxuICAgIHIubVsxXVswXSA9XHJcbiAgICAgIC1tYXRyRGV0ZXJtM3gzKHRoaXMubVsxXVswXSwgdGhpcy5tWzFdWzJdLCB0aGlzLm1bMV1bM10sXHJcbiAgICAgICAgICAgICAgICAgICAgIHRoaXMubVsyXVswXSwgdGhpcy5tWzJdWzJdLCB0aGlzLm1bMl1bM10sXHJcbiAgICAgICAgICAgICAgICAgICAgIHRoaXMubVszXVswXSwgdGhpcy5tWzNdWzJdLCB0aGlzLm1bM11bM10pIC8gZGV0O1xyXG5cclxuICAgIHIubVsyXVswXSA9XHJcbiAgICAgICttYXRyRGV0ZXJtM3gzKHRoaXMubVsxXVswXSwgdGhpcy5tWzFdWzFdLCB0aGlzLm1bMV1bM10sXHJcbiAgICAgICAgICAgICAgICAgICAgIHRoaXMubVsyXVswXSwgdGhpcy5tWzJdWzFdLCB0aGlzLm1bMl1bM10sXHJcbiAgICAgICAgICAgICAgICAgICAgIHRoaXMubVszXVswXSwgdGhpcy5tWzNdWzFdLCB0aGlzLm1bM11bM10pIC8gZGV0O1xyXG5cclxuICAgIHIubVszXVswXSA9XHJcbiAgICAgIC1tYXRyRGV0ZXJtM3gzKHRoaXMubVsxXVswXSwgdGhpcy5tWzFdWzFdLCB0aGlzLm1bMV1bMl0sXHJcbiAgICAgICAgICAgICAgICAgICAgIHRoaXMubVsyXVswXSwgdGhpcy5tWzJdWzFdLCB0aGlzLm1bMl1bMl0sXHJcbiAgICAgICAgICAgICAgICAgICAgIHRoaXMubVszXVswXSwgdGhpcy5tWzNdWzFdLCB0aGlzLm1bM11bMl0pIC8gZGV0O1xyXG5cclxuICAgIHIubVswXVsxXSA9XHJcbiAgICAgIC1tYXRyRGV0ZXJtM3gzKHRoaXMubVswXVsxXSwgdGhpcy5tWzBdWzJdLCB0aGlzLm1bMF1bM10sXHJcbiAgICAgICAgICAgICAgICAgICAgIHRoaXMubVsyXVsxXSwgdGhpcy5tWzJdWzJdLCB0aGlzLm1bMl1bM10sXHJcbiAgICAgICAgICAgICAgICAgICAgIHRoaXMubVszXVsxXSwgdGhpcy5tWzNdWzJdLCB0aGlzLm1bM11bM10pIC8gZGV0O1xyXG5cclxuICAgIHIubVsxXVsxXSA9XHJcbiAgICAgICttYXRyRGV0ZXJtM3gzKHRoaXMubVswXVswXSwgdGhpcy5tWzBdWzJdLCB0aGlzLm1bMF1bM10sXHJcbiAgICAgICAgICAgICAgICAgICAgIHRoaXMubVsyXVswXSwgdGhpcy5tWzJdWzJdLCB0aGlzLm1bMl1bM10sXHJcbiAgICAgICAgICAgICAgICAgICAgIHRoaXMubVszXVswXSwgdGhpcy5tWzNdWzJdLCB0aGlzLm1bM11bM10pIC8gZGV0O1xyXG5cclxuICAgIHIubVsyXVsxXSA9XHJcbiAgICAgIC1tYXRyRGV0ZXJtM3gzKHRoaXMubVswXVswXSwgdGhpcy5tWzBdWzFdLCB0aGlzLm1bMF1bM10sXHJcbiAgICAgICAgICAgICAgICAgICAgIHRoaXMubVsyXVswXSwgdGhpcy5tWzJdWzFdLCB0aGlzLm1bMl1bM10sXHJcbiAgICAgICAgICAgICAgICAgICAgIHRoaXMubVszXVswXSwgdGhpcy5tWzNdWzFdLCB0aGlzLm1bM11bM10pIC8gZGV0O1xyXG5cclxuICAgIHIubVszXVsxXSA9XHJcbiAgICAgICttYXRyRGV0ZXJtM3gzKHRoaXMubVswXVswXSwgdGhpcy5tWzBdWzFdLCB0aGlzLm1bMF1bMl0sXHJcbiAgICAgICAgICAgICAgICAgICAgIHRoaXMubVsyXVswXSwgdGhpcy5tWzJdWzFdLCB0aGlzLm1bMl1bMl0sXHJcbiAgICAgICAgICAgICAgICAgICAgIHRoaXMubVszXVswXSwgdGhpcy5tWzNdWzFdLCB0aGlzLm1bM11bMl0pIC8gZGV0O1xyXG5cclxuXHJcbiAgICByLm1bMF1bMl0gPVxyXG4gICAgICArbWF0ckRldGVybTN4Myh0aGlzLm1bMF1bMV0sIHRoaXMubVswXVsyXSwgdGhpcy5tWzBdWzNdLFxyXG4gICAgICAgICAgICAgICAgICAgICB0aGlzLm1bMV1bMV0sIHRoaXMubVsxXVsyXSwgdGhpcy5tWzFdWzNdLFxyXG4gICAgICAgICAgICAgICAgICAgICB0aGlzLm1bM11bMV0sIHRoaXMubVszXVsyXSwgdGhpcy5tWzNdWzNdKSAvIGRldDtcclxuXHJcbiAgICByLm1bMV1bMl0gPVxyXG4gICAgICAtbWF0ckRldGVybTN4Myh0aGlzLm1bMF1bMF0sIHRoaXMubVswXVsyXSwgdGhpcy5tWzBdWzNdLFxyXG4gICAgICAgICAgICAgICAgICAgICB0aGlzLm1bMV1bMF0sIHRoaXMubVsxXVsyXSwgdGhpcy5tWzFdWzNdLFxyXG4gICAgICAgICAgICAgICAgICAgICB0aGlzLm1bM11bMF0sIHRoaXMubVszXVsyXSwgdGhpcy5tWzNdWzNdKSAvIGRldDtcclxuXHJcbiAgICByLm1bMl1bMl0gPVxyXG4gICAgICArbWF0ckRldGVybTN4Myh0aGlzLm1bMF1bMF0sIHRoaXMubVswXVsxXSwgdGhpcy5tWzBdWzNdLFxyXG4gICAgICAgICAgICAgICAgICAgICB0aGlzLm1bMV1bMF0sIHRoaXMubVsxXVsxXSwgdGhpcy5tWzFdWzNdLFxyXG4gICAgICAgICAgICAgICAgICAgICB0aGlzLm1bM11bMF0sIHRoaXMubVszXVsxXSwgdGhpcy5tWzNdWzNdKSAvIGRldDtcclxuXHJcbiAgICByLm1bM11bMl0gPVxyXG4gICAgICAtbWF0ckRldGVybTN4Myh0aGlzLm1bMF1bMF0sIHRoaXMubVswXVsxXSwgdGhpcy5tWzBdWzJdLFxyXG4gICAgICAgICAgICAgICAgICAgICB0aGlzLm1bMV1bMF0sIHRoaXMubVsxXVsxXSwgdGhpcy5tWzFdWzJdLFxyXG4gICAgICAgICAgICAgICAgICAgICB0aGlzLm1bM11bMF0sIHRoaXMubVszXVsxXSwgdGhpcy5tWzNdWzJdKSAvIGRldDtcclxuXHJcblxyXG4gICAgci5tWzBdWzNdID1cclxuICAgICAgLW1hdHJEZXRlcm0zeDModGhpcy5tWzBdWzFdLCB0aGlzLm1bMF1bMl0sIHRoaXMubVswXVszXSxcclxuICAgICAgICAgICAgICAgICAgICAgdGhpcy5tWzFdWzFdLCB0aGlzLm1bMV1bMl0sIHRoaXMubVsxXVszXSxcclxuICAgICAgICAgICAgICAgICAgICAgdGhpcy5tWzJdWzFdLCB0aGlzLm1bMl1bMl0sIHRoaXMubVsyXVszXSkgLyBkZXQ7XHJcblxyXG4gICAgci5tWzFdWzNdID1cclxuICAgICAgK21hdHJEZXRlcm0zeDModGhpcy5tWzBdWzBdLCB0aGlzLm1bMF1bMl0sIHRoaXMubVswXVszXSxcclxuICAgICAgICAgICAgICAgICAgICAgdGhpcy5tWzFdWzBdLCB0aGlzLm1bMV1bMl0sIHRoaXMubVsxXVszXSxcclxuICAgICAgICAgICAgICAgICAgICAgdGhpcy5tWzJdWzBdLCB0aGlzLm1bMl1bMl0sIHRoaXMubVsyXVszXSkgLyBkZXQ7XHJcblxyXG4gICAgci5tWzJdWzNdID1cclxuICAgICAgLW1hdHJEZXRlcm0zeDModGhpcy5tWzBdWzBdLCB0aGlzLm1bMF1bMV0sIHRoaXMubVswXVszXSxcclxuICAgICAgICAgICAgICAgICAgICAgdGhpcy5tWzFdWzBdLCB0aGlzLm1bMV1bMV0sIHRoaXMubVsxXVszXSxcclxuICAgICAgICAgICAgICAgICAgICAgdGhpcy5tWzJdWzBdLCB0aGlzLm1bMl1bMV0sIHRoaXMubVsyXVszXSkgLyBkZXQ7XHJcblxyXG4gICAgci5tWzNdWzNdID1cclxuICAgICAgK21hdHJEZXRlcm0zeDModGhpcy5tWzBdWzBdLCB0aGlzLm1bMF1bMV0sIHRoaXMubVswXVsyXSxcclxuICAgICAgICAgICAgICAgICAgICAgdGhpcy5tWzFdWzBdLCB0aGlzLm1bMV1bMV0sIHRoaXMubVsxXVsyXSxcclxuICAgICAgICAgICAgICAgICAgICAgdGhpcy5tWzJdWzBdLCB0aGlzLm1bMl1bMV0sIHRoaXMubVsyXVsyXSkgLyBkZXQ7XHJcblxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCA0OyBpKyspXHJcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgNCA7IGorKylcclxuICAgICAgICB0aGlzLm1baV1bal0gPSByLm1baV1bal07XHJcbiAgfVxyXG5cclxuICByb3RhdGUoYW5nbGUsIHYpIHtcclxuICAgIGxldCBhID0gYW5nbGUgKiBNYXRoLlBJIC8gMTgwLCBzID0gTWF0aC5zaW4oYSksIGMgPSBNYXRoLmNvcyhhKTtcclxuXHJcbiAgICByZXR1cm4gbWF0NChcclxuICAgICAgICBjICsgdi54ICogdi54ICogKDEgLSBjKSwgdi55ICogdi54ICogKDEgLSBjKSAtIHYueiAqIHMsIHYueiAqIHYueCAqICgxIC0gYykgKyB2LnkgKiBzLCAwLFxyXG4gICAgICAgIHYueCAqIHYueSAqICgxIC0gYykgKyB2LnogKiBzLCBjICsgdi55ICogdi55ICogKDEgLSBjKSwgdi56ICogdi55ICogKDEgLSBjKSAtIHYueCAqIHMsIDAsXHJcbiAgICAgICAgdi54ICogdi56ICogKDEgLSBjKSAtIHYueSAqIHMsIHYueSAqIHYueiAqICgxIC0gYykgKyB2LnggKiBzLCBjICsgdi56ICogdi56ICogKDEgLSBjKSwgMCxcclxuICAgICAgICAwLCAwLCAwLCAxKTtcclxuICB9XHJcblxyXG4gIHNldFJvdGF0ZShhbmdsZSwgdikge1xyXG4gICAgbGV0IGEgPSBhbmdsZSAqIE1hdGguUEkgLyAxODAsIHMgPSBNYXRoLnNpbihhKSwgYyA9IE1hdGguY29zKGEpO1xyXG5cclxuICAgIHRoaXMubSA9XHJcbiAgICBbXHJcbiAgICAgIFtjICsgdi54ICogdi54ICogKDEgLSBjKSwgdi55ICogdi54ICogKDEgLSBjKSAtIHYueiAqIHMsIHYueiAqIHYueCAqICgxIC0gYykgKyB2LnkgKiBzLCAwXSxcclxuICAgICAgW3YueCAqIHYueSAqICgxIC0gYykgKyB2LnogKiBzLCBjICsgdi55ICogdi55ICogKDEgLSBjKSwgdi56ICogdi55ICogKDEgLSBjKSAtIHYueCAqIHMsIDBdLFxyXG4gICAgICBbdi54ICogdi56ICogKDEgLSBjKSAtIHYueSAqIHMsIHYueSAqIHYueiAqICgxIC0gYykgKyB2LnggKiBzLCBjICsgdi56ICogdi56ICogKDEgLSBjKSwgMF0sXHJcbiAgICAgIFswLCAwLCAwLCAxXVxyXG4gICAgXTtcclxuICB9XHJcblxyXG4gIHZpZXcoTG9jLCBBdCwgVXAxKSB7XHJcbiAgICBsZXRcclxuICAgICAgRGlyID0gQXQuc3ViVmVjKExvYykubm9ybWFsaXplKCksXHJcbiAgICAgIFJpZ2h0ID0gRGlyLmNyb3NzKFVwMSkubm9ybWFsaXplKCksXHJcbiAgICAgIFVwID0gUmlnaHQuY3Jvc3MoRGlyKS5ub3JtYWxpemUoKTtcclxuICAgIFxyXG4gICAgcmV0dXJuIG1hdDQoUmlnaHQueCwgVXAueCwgLURpci54LCAwLFxyXG4gICAgICAgICAgICAgICAgIFJpZ2h0LnksIFVwLnksIC1EaXIueSwgMCxcclxuICAgICAgICAgICAgICAgICBSaWdodC56LCBVcC56LCAtRGlyLnosIDAsXHJcbiAgICAgICAgICAgICAgICAgLUxvYy5kb3QoUmlnaHQpLCAtTG9jLmRvdChVcCksIExvYy5kb3QoRGlyKSwgMSk7XHJcbiAgfVxyXG5cclxuICBzZXRWaWV3KExvYywgQXQsIFVwMSkge1xyXG4gICAgbGV0XHJcbiAgICAgIERpciA9IEF0LnN1YlZlYyhMb2MpLm5vcm1hbGl6ZSgpLFxyXG4gICAgICBSaWdodCA9IERpci5jcm9zcyhVcDEpLm5vcm1hbGl6ZSgpLFxyXG4gICAgICBVcCA9IFJpZ2h0LmNyb3NzKERpcikubm9ybWFsaXplKCk7XHJcbiAgICBcclxuICAgIHRoaXMubSA9XHJcbiAgICBbXHJcbiAgICAgIFtSaWdodC54LCBVcC54LCAtRGlyLngsIDBdLFxyXG4gICAgICBbUmlnaHQueSwgVXAueSwgLURpci55LCAwXSxcclxuICAgICAgW1JpZ2h0LnosIFVwLnosIC1EaXIueiwgMF0sXHJcbiAgICAgIFstTG9jLmRvdChSaWdodCksIC1Mb2MuZG90KFVwKSwgTG9jLmRvdChEaXIpLCAxXVxyXG4gICAgXTtcclxuICB9XHJcblxyXG4gIGZydXN0dW0obGVmdCwgcmlnaHQsIGJvdHRvbSwgdG9wLCBuZWFyLCBmYXIpIHtcclxuICAgIHJldHVybiBtYXQ0KCgyICogbmVhcikgLyAocmlnaHQgLSBsZWZ0KSwgMCwgMCwgMCxcclxuICAgICAgICAgICAgICAgICAwLCAoMiAqIG5lYXIpIC8gKHRvcCAtIGJvdHRvbSksIDAsIDAsXHJcbiAgICAgICAgICAgICAgICAgKHJpZ2h0ICsgbGVmdCkgLyAocmlnaHQgLSBsZWZ0KSwgKHRvcCArIGJvdHRvbSkgLyAodG9wIC0gYm90dG9tKSwgKC0oKGZhciArIG5lYXIpIC8gKGZhciAtIG5lYXIpKSksICgtMSksXHJcbiAgICAgICAgICAgICAgICAgMCwgMCwgKC0oKDIgKiBuZWFyICogZmFyKSAvIChmYXIgLSBuZWFyKSkpLCAwKTtcclxuICB9XHJcblxyXG4gIHNldEZydXN0dW0obGVmdCwgcmlnaHQsIGJvdHRvbSwgdG9wLCBuZWFyLCBmYXIpIHtcclxuICAgIHRoaXMubSA9XHJcbiAgICBbXHJcbiAgICAgIFsoMiAqIG5lYXIpIC8gKHJpZ2h0IC0gbGVmdCksIDAsIDAsIDBdLFxyXG4gICAgICBbMCwgKDIgKiBuZWFyKSAvICh0b3AgLSBib3R0b20pLCAwLCAwXSxcclxuICAgICAgWyhyaWdodCArIGxlZnQpIC8gKHJpZ2h0IC0gbGVmdCksICh0b3AgKyBib3R0b20pIC8gKHRvcCAtIGJvdHRvbSksICgtKChmYXIgKyBuZWFyKSAvIChmYXIgLSBuZWFyKSkpLCAoLTEpXSxcclxuICAgICAgWzAsIDAsICgtKCgyICogbmVhciAqIGZhcikgLyAoZmFyIC0gbmVhcikpKSwgMF1cclxuICAgIF07XHJcbiAgfVxyXG5cclxuICB0cmFuc3Bvc2UoKSB7XHJcbiAgICByZXR1cm4gbWF0NCh0aGlzLm1bMF1bMF0sIHRoaXMubVsxXVswXSwgdGhpcy5tWzJdWzBdLCB0aGlzLm1bM11bMF0sXHJcbiAgICAgIHRoaXMubVswXVsxXSwgdGhpcy5tWzFdWzFdLCB0aGlzLm1bMl1bMV0sIHRoaXMubVszXVsxXSxcclxuICAgICAgdGhpcy5tWzBdWzJdLCB0aGlzLm1bMV1bMl0sIHRoaXMubVsyXVsyXSwgdGhpcy5tWzNdWzJdLFxyXG4gICAgICB0aGlzLm1bMF1bM10sIHRoaXMubVsxXVszXSwgdGhpcy5tWzJdWzNdLCB0aGlzLm1bM11bM10pO1xyXG4gIH1cclxuXHJcbiAgc2V0VHJhbnNwb3NlKCkge1xyXG4gICAgdGhpcy5tID0gXHJcbiAgICBbXHJcbiAgICAgIFt0aGlzLm1bMF1bMF0sIHRoaXMubVsxXVswXSwgdGhpcy5tWzJdWzBdLCB0aGlzLm1bM11bMF1dLFxyXG4gICAgICBbdGhpcy5tWzBdWzFdLCB0aGlzLm1bMV1bMV0sIHRoaXMubVsyXVsxXSwgdGhpcy5tWzNdWzFdXSxcclxuICAgICAgW3RoaXMubVswXVsyXSwgdGhpcy5tWzFdWzJdLCB0aGlzLm1bMl1bMl0sIHRoaXMubVszXVsyXV0sXHJcbiAgICAgIFt0aGlzLm1bMF1bM10sIHRoaXMubVsxXVszXSwgdGhpcy5tWzJdWzNdLCB0aGlzLm1bM11bM11dXHJcbiAgICBdO1xyXG4gIH1cclxuXHJcbiAgcm90YXRlWChhbmdsZUluRGVncmVlKSB7XHJcbiAgICBsZXQgYSA9IGFuZ2xlSW5EZWdyZWUgKiBNYXRoLlBJIC8gMTgwLCBzaSA9IE1hdGguc2luKGEpLCBjbyA9IE1hdGguY29zKGEpO1xyXG5cclxuICAgIHJldHVybiBtYXQ0KDEsIDAsIDAsIDAsXHJcbiAgICAgICAgICAgICAgICAwLCBjbywgc2ksIDAsXHJcbiAgICAgICAgICAgICAgICAwLCAtc2ksIGNvLCAwLFxyXG4gICAgICAgICAgICAgICAgMCwgMCwgMCwgMSk7XHJcbiAgfVxyXG5cclxuICBzZXRSb3RhdGVYKGFuZ2xlSW5EZWdyZWUpIHtcclxuICAgIGxldCBhID0gYW5nbGVJbkRlZ3JlZSAqIE1hdGguUEkgLyAxODAsIHNpID0gTWF0aC5zaW4oYSksIGNvID0gTWF0aC5jb3MoYSk7XHJcblxyXG4gICAgdGhpcy5tID0gXHJcbiAgICBbXHJcbiAgICAgIFsxLCAwLCAwLCAwXSxcclxuICAgICAgWzAsIGNvLCBzaSwgMF0sXHJcbiAgICAgIFswLCAtc2ksIGNvLCAwXSxcclxuICAgICAgWzAsIDAsIDAsIDFdXHJcbiAgICBdOyAgXHJcbiAgfVxyXG5cclxuICByb3RhdGVZKGFuZ2xlSW5EZWdyZWUpIHtcclxuICAgIGxldCBhID0gYW5nbGVJbkRlZ3JlZSAqIE1hdGguUEkgLyAxODAsIHNpID0gTWF0aC5zaW4oYSksIGNvID0gTWF0aC5jb3MoYSk7XHJcblxyXG4gICAgcmV0dXJuIG1hdDQoY28sIDAsIC1zaSwgMCxcclxuICAgICAgICAgICAgICAgIDAsIDEsIDAsIDAsXHJcbiAgICAgICAgICAgICAgICBzaSwgMCwgY28sIDAsXHJcbiAgICAgICAgICAgICAgICAwLCAwLCAwLCAxKTtcclxuICB9XHJcblxyXG4gIHNldFJvdGF0ZVkoYW5nbGVJbkRlZ3JlZSkge1xyXG4gICAgbGV0IGEgPSBhbmdsZUluRGVncmVlICogTWF0aC5QSSAvIDE4MCwgc2kgPSBNYXRoLnNpbihhKSwgY28gPSBNYXRoLmNvcyhhKTtcclxuXHJcbiAgICB0aGlzLm0gPSBcclxuICAgIFtcclxuICAgICAgW2NvLCAwLCAtc2ksIDBdLFxyXG4gICAgICBbMCwgMSwgMCwgMF0sXHJcbiAgICAgIFtzaSwgMCwgY28sIDBdLFxyXG4gICAgICBbMCwgMCwgMCwgMV1cclxuICAgIF07XHJcbiAgfVxyXG5cclxuICByb3RhdGVaKGFuZ2xlSW5EZWdyZWUpIHtcclxuICAgIGxldCBhID0gYW5nbGVJbkRlZ3JlZSAqIE1hdGguUEkgLyAxODAsIHNpID0gTWF0aC5zaW4oYSksIGNvID0gTWF0aC5jb3MoYSk7XHJcblxyXG4gICAgcmV0dXJuIG1hdDQoY28sIHNpLCAwLCAwLFxyXG4gICAgICAgICAgICAgICAgLXNpLCBjbywgMCwgMCxcclxuICAgICAgICAgICAgICAgIDAsIDAsIDEsIDAsXHJcbiAgICAgICAgICAgICAgICAwLCAwLCAwLCAxKTtcclxuICB9XHJcblxyXG4gIHNldFJvdGF0ZVooYW5nbGVJbkRlZ3JlZSlcclxuICB7XHJcbiAgICBsZXQgYSA9IGFuZ2xlSW5EZWdyZWUgKiBNYXRoLlBJIC8gMTgwLCBzaSA9IE1hdGguc2luKGEpLCBjbyA9IE1hdGguY29zKGEpO1xyXG5cclxuICAgIHRoaXMubSA9IFxyXG4gICAgW1xyXG4gICAgICBbY28sIHNpLCAwLCAwXSxcclxuICAgICAgWy1zaSwgY28sIDAsIDBdLFxyXG4gICAgICBbMCwgMCwgMSwgMF0sXHJcbiAgICAgIFswLCAwLCAwLCAxXVxyXG4gICAgXTtcclxuICB9XHJcblxyXG4gIHNjYWxlKHYpIHtcclxuICAgIHJldHVybiBtYXQ0KHYueCwgMCwgMCwgMCxcclxuICAgICAgICAgICAgICAgIDAsIHYueSwgMCwgMCxcclxuICAgICAgICAgICAgICAgIDAsIDAsIHYueiwgMCxcclxuICAgICAgICAgICAgICAgIDAsIDAsIDAsIDEpO1xyXG4gIH1cclxuXHJcbiAgc2V0U2NhbGUodikge1xyXG4gICAgdGhpcy5tID1cclxuICAgIFtcclxuICAgICAgW3YueCwgMCwgMCwgMF0sXHJcbiAgICAgIFswLCB2LnksIDAsIDBdLFxyXG4gICAgICBbMCwgMCwgdi56LCAwXSxcclxuICAgICAgWzAsIDAsIDAsIDFdXHJcbiAgICBdO1xyXG4gIH1cclxuXHJcbiAgb3J0aG8obGVmdCwgcmlnaHQsIGJvdHRvbSwgdG9wLCBuZWFyLCBmYXIpXHJcbiAge1xyXG4gICAgcmV0dXJuIG1hdDQoMiAvIChyaWdodCAtIGxlZnQpLCAwLCAwLCAwLFxyXG4gICAgICAgICAgICAgICAgMCwgMiAvICh0b3AgLSBib3R0b20pLCAwLCAwLFxyXG4gICAgICAgICAgICAgICAgMCwgMCwgLTIgLyAoZmFyIC0gbmVhciksIDAsXHJcbiAgICAgICAgICAgICAgICAtKHJpZ2h0ICsgbGVmdCkgLyAocmlnaHQgLSBsZWZ0KSwgLSh0b3AgKyBib3R0b20pIC8gKHRvcCAtIGJvdHRvbSksIC0oZmFyICsgbmVhcikgLyAoZmFyIC0gbmVhciksIDEpO1xyXG4gIH1cclxuXHJcbiAgc2V0T3J0aG8obGVmdCwgcmlnaHQsIGJvdHRvbSwgdG9wLCBuZWFyLCBmYXIpXHJcbiAge1xyXG4gICAgdGhpcy5tID1cclxuICAgIFtcclxuICAgICAgWzIgLyAocmlnaHQgLSBsZWZ0KSwgMCwgMCwgMF0sXHJcbiAgICAgIFswLCAyIC8gKHRvcCAtIGJvdHRvbSksIDAsIDBdLFxyXG4gICAgICBbMCwgMCwgLTIgLyAoZmFyIC0gbmVhciksIDBdLFxyXG4gICAgICBbLShyaWdodCArIGxlZnQpIC8gKHJpZ2h0IC0gbGVmdCksIC0odG9wICsgYm90dG9tKSAvICh0b3AgLSBib3R0b20pLCAtKGZhciArIG5lYXIpIC8gKGZhciAtIG5lYXIpLCAxXVxyXG4gICAgXTtcclxuICB9XHJcblxyXG4gIHRvQXJyYXkoKSB7XHJcbiAgICByZXR1cm4gW10uY29uY2F0KC4uLnRoaXMubSk7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gbWF0NCguLi5hcmdzKSB7XHJcbiAgcmV0dXJuIG5ldyBfbWF0NCguLi5hcmdzKTtcclxufVxyXG5cclxuZnVuY3Rpb24gbWF0ckRldGVybTN4MyhhMTEsIGExMiwgYTEzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgIGEyMSwgYTIyLCBhMjMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgYTMxLCBhMzIsIGEzMykge1xyXG4gIHJldHVybiBhMTEgKiBhMjIgKiBhMzMgKyBhMTIgKiBhMjMgKiBhMzEgKyBhMTMgKiBhMjEgKiBhMzIgLVxyXG4gICAgICAgICBhMTEgKiBhMjMgKiBhMzIgLSBhMTIgKiBhMjEgKiBhMzMgLSBhMTMgKiBhMjIgKiBhMzE7XHJcbn1cclxuIiwiY2xhc3MgX3ZlYzMge1xyXG4gIHg7XHJcbiAgeTtcclxuICB6O1xyXG5cclxuICBjb25zdHJ1Y3RvciguLi5hcmdzKSB7IFxyXG4gICAgaWYgKGFyZ3MubGVuZ3RoID09PSAzKVxyXG4gICAgICB0aGlzLnggPSBhcmdzWzBdLCB0aGlzLnkgPSBhcmdzWzFdLCB0aGlzLnogPSBhcmdzWzJdO1xyXG4gICAgZWxzZSBpZiAodHlwZW9mIGFyZ3NbMF0gPT0gXCJvYmplY3RcIikge1xyXG4gICAgICB0aGlzLnggPSBhcmdzWzBdLngsIHRoaXMueSA9IGFyZ3NbMF0ueSwgdGhpcy56ID0gYXJnc1swXS56OyBcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMueCA9IGFyZ3NbMF0sIHRoaXMueSA9IGFyZ3NbMF0sIHRoaXMueiA9IGFyZ3NbMF07IFxyXG4gICAgfVxyXG4gIH0gLy8gRW5kIG9mICdjb25zdHJ1Y3RvcicgZnVuY3Rpb25cclxuXHJcbiAgLy8gVmVjdG9yIG11bHRpcGx1ZSBieSBudW1iZXIgZnVuY3Rpb25cclxuICBtdWxOdW0obnVtKSB7XHJcbiAgICByZXR1cm4gdmVjMyh0aGlzLnggKiBudW0sIHRoaXMueSAqIG51bSwgdGhpcy56ICogbnVtKTtcclxuICB9IC8vIEVuZCBvZiAnbXVsTnVtJyBmdW5jdGlvblxyXG5cclxuICAvLyBWZWN0b3IgZGl2aWRlIGJ5IG51bWJlciBmdW5jdGlvblxyXG4gIGRpdk51bShudW0pIHtcclxuICAgIHJldHVybiB2ZWMzKHRoaXMueCAvIG51bSwgdGhpcy55IC8gbnVtLCB0aGlzLnogLyBudW0pO1xyXG4gIH0gLy8gRW5kIG9mICdkdXZOdW0nIGZ1bmN0aW9uXHJcblxyXG4gIC8vIFZlY3RvciBhZGQgbnVtYmVyIGZ1bmN0aW9uXHJcbiAgYWRkTnVtKG51bSkge1xyXG4gICAgcmV0dXJuIHZlYzModGhpcy54ICsgbnVtLCB0aGlzLnkgKyBudW0sIHRoaXMueiArIG51bSk7XHJcbiAgfSAvLyBFbmQgb2YgJ2FkZE51bScgZnVuY3Rpb25cclxuXHJcbiAgLy8gVmVjdG9yIHN1YnN0cmFjdCBudW1iZXIgZnVuY3Rpb25cclxuICBzdWJOdW0obnVtKSB7XHJcbiAgICByZXR1cm4gdmVjMyh0aGlzLnggLSBudW0sIHRoaXMueSAtIG51bSwgdGhpcy56IC0gbnVtKTtcclxuICB9IC8vIEVuZCBvZiAnc3ViTnVtJyBmdW5jdGlvblxyXG5cclxuICAvLyBWZWN0b3IgYWRkIHZlY3RvciBmdW5jdGlvblxyXG4gIGFkZFZlYyh2ZWMpIHtcclxuICAgIHJldHVybiB2ZWMzKHRoaXMueCArIHZlYy54LCB0aGlzLnkgKyB2ZWMueSwgdGhpcy56ICsgdmVjLnopO1xyXG4gIH0gLy8gRW5kIG9mICdhZGRWZWMnIGZ1bmN0aW9uXHJcblxyXG4gIC8vIFZlY3RvciBzdWJzdHJhY3QgdmVjdG9yIGZ1bmN0aW9uXHJcbiAgc3ViVmVjKHZlYykge1xyXG4gICAgcmV0dXJuIHZlYzModGhpcy54IC0gdmVjLngsIHRoaXMueSAtIHZlYy55LCB0aGlzLnogLSB2ZWMueik7XHJcbiAgfSAvLyBFbmQgb2YgJ3N1YlZlYycgZnVuY3Rpb25cclxuXHJcbiAgLy8gTWFrZSB2ZWN0b3IgbmVnYXRpdmUgdmVjdG9yXHJcbiAgbmVnKHZlYykge1xyXG4gICAgcmV0dXJuIHZlYzMoLXRoaXMueCwgLXRoaXMueSwgLXRoaXMueik7XHJcbiAgfSAvLyBFbmQgb2YgJ25lZycgZnVuY3Rpb25cclxuXHJcbiAgLy8gVmVjdG9yIGRvdCBwcm9kdWN0IGZ1bmN0aW9uXHJcbiAgZG90KHZlYykge1xyXG4gICAgcmV0dXJuIHRoaXMueCAqIHZlYy54ICsgdGhpcy55ICogdmVjLnkgKyB0aGlzLnogKiB2ZWMuejtcclxuICB9IC8vIEVuZCBvZiAnZG90JyBmdW5jdGlvblxyXG5cclxuICAvLyBWZWN0b3IgY3Jvc3MgcHJvZHVjdCBmdW5jdGlvblxyXG4gIGNyb3NzKHZlYykge1xyXG4gICAgcmV0dXJuIHZlYzMoXHJcbiAgICAgIHRoaXMueSAqIHZlYy56IC0gdGhpcy56ICogdmVjLnksXHJcbiAgICAgIHRoaXMueiAqIHZlYy54IC0gdGhpcy54ICogdmVjLnosXHJcbiAgICAgIHRoaXMueCAqIHZlYy55IC0gdGhpcy55ICogdmVjLngpO1xyXG4gIH0gLy8gRW5kIG9mICdjcm9zcycgZnVuY3Rpb25cclxuICBcclxuICAvLyBWZWN0b3IgbGVuZ2h0IGV2YXVsYXRpbmcgZnVuY3Rpb25cclxuICBsZW4oKSB7XHJcbiAgICBsZXQgbGVuID0gdGhpcy5kb3QodGhpcyk7XHJcblxyXG4gICAgaWYgKGxlbiA9PSAwIHx8IGxlbiA9PSAxKVxyXG4gICAgICByZXR1cm4gbGVuO1xyXG5cclxuICAgIHJldHVybiBNYXRoLnNxcnQobGVuKTtcclxuICB9IC8vIEVuZCBvZiAnbGVuJyBmdW5jdGlvblxyXG5cclxuICAvLyBTcXVhcmUgb2YgdmVjdG9yIGxlbmdodCBldmF1bGF0aW5nIGZ1bmN0aW9uXHJcbiAgbGVuMigpIHtcclxuICAgIHJldHVybiB0aGlzLmRvdCh0aGlzKTtcclxuICB9IC8vIEVuZCBvZiAnbGVuMicgZnVuY3Rpb25cclxuXHJcbiAgLy8gVmVjdG9yIG5vcm1hbGl6aW5nIGZ1bmN0aW9uXHJcbiAgbm9ybWFsaXplKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuZGl2TnVtKHRoaXMubGVuKCkpO1xyXG4gIH0gLy8gRW5kIG9mICdub3JtYWxpemUnIGZ1bmN0aW9uXHJcblxyXG4gIC8vIFZlY3RvciBzZXR0aW5nIG5vcm1hbGl6ZSBmdW5jdGlvblxyXG4gIHNldE5vcm1hbGl6ZSgpIHtcclxuICAgIGxldCBsID0gdGhpcy5sZW4oKTtcclxuXHJcbiAgICB0aGlzLnggLz0gbDtcclxuICAgIHRoaXMueSAvPSBsO1xyXG4gICAgdGhpcy56IC89IGw7XHJcbiAgfSAvLyBFbmQgb2YgJ25vcm1hbGl6ZScgZnVuY3Rpb25cclxuXHJcbiAgLy8gVmVjdG9yIHRyYW5zZm9ybSBieSBtYXRyaXggZnVuY3Rpb25cclxuICB2ZWN0b3JUcmFuc2Zvcm0oYSlcclxuICB7XHJcbiAgICByZXR1cm4gdmVjMyh0aGlzLnggKiBhLm1bMF1bMF0gKyB0aGlzLnkgKiBhLm1bMV1bMF0gKyB0aGlzLnogKiBhLm1bMl1bMF0sXHJcbiAgICAgICAgICAgICAgICB0aGlzLnggKiBhLm1bMF1bMV0gKyB0aGlzLnkgKiBhLm1bMV1bMV0gKyB0aGlzLnogKiBhLm1bMl1bMV0sXHJcbiAgICAgICAgICAgICAgICB0aGlzLnggKiBhLm1bMF1bMl0gKyB0aGlzLnkgKiBhLm1bMV1bMl0gKyB0aGlzLnogKiBhLm1bMl1bMl0pO1xyXG4gIH0gLy8gRW5kIG9mICd2ZWN0b3JUcmFuc2Zvcm0nIGZ1bmN0aW9uXHJcblxyXG4gIC8vIFZlY3RvciBtdWx0aXBsdWUgYnkgbWF0cml4IGZ1bmN0aW9uXHJcbiAgbXVsTWF0cihtKVxyXG4gIHtcclxuICAgIGxldCB3ID0gdGhpcy54ICogYS5tWzBdWzNdICsgdGhpcy55ICogYS5tWzFdWzNdICsgdGhpcy56ICogYS5tWzJdWzNdICsgYS5tWzNdWzNdO1xyXG4gIFxyXG4gICAgcmV0dXJuIHZlYzMoKHRoaXMueCAqIGEubVswXVswXSArIHRoaXMueSAqIGEubVsxXVswXSArIHRoaXMueiAqIGEubVsyXVswXSArIGEubVszXVswXSkgLyB3LFxyXG4gICAgICAgICAgICAgICAgICAodGhpcy54ICogYS5tWzBdWzFdICsgdGhpcy55ICogYS5tWzFdWzFdICsgdGhpcy56ICogYS5tWzJdWzFdICsgYS5tWzNdWzFdKSAvIHcsXHJcbiAgICAgICAgICAgICAgICAgICh0aGlzLnggKiBhLm1bMF1bMl0gKyB0aGlzLnkgKiBhLm1bMV1bMl0gKyB0aGlzLnogKiBhLm1bMl1bMl0gKyBhLm1bM11bMl0pIC8gdyk7XHJcbiAgfSAvLyBFbmQgb2YgJ211bE1hdHInIGZ1bmN0aW9uXHJcblxyXG4gIHBvaW50VHJhbnNmb3JtKG0pXHJcbiAge1xyXG4gICAgcmV0dXJuIHZlYzModGhpcy54ICogYS5tWzBdWzBdICsgdGhpcy55ICogYS5tWzFdWzBdICsgdGhpcy56ICogYS5tWzJdWzBdICsgYS5tWzNdWzBdLFxyXG4gICAgICAgICAgICAgIHRoaXMueCAqIGEubVswXVsxXSArIHRoaXMueSAqIGEubVsxXVsxXSArIHRoaXMueiAqIGEubVsyXVsxXSArIGEubVszXVsxXSxcclxuICAgICAgICAgICAgICB0aGlzLnggKiBhLm1bMF1bMl0gKyB0aGlzLnkgKiBhLm1bMV1bMl0gKyB0aGlzLnogKiBhLm1bMl1bMl0gKyBhLm1bM11bMl0pO1xyXG4gIH0gLy8gRW5kIG9mICdwb2ludFRyYW5zZm9ybScgZnVuY3Rpb25cclxufVxyXG5cclxuLy8gVmVjdG9yIHNldHRpbmcgZnVuY3Rpb25cclxuZXhwb3J0IGZ1bmN0aW9uIHZlYzMoLi4uYXJncykge1xyXG4gIHJldHVybiBuZXcgX3ZlYzMoLi4uYXJncyk7XHJcbn0gLy8gRW5kIG9mICd2ZWMzJyBmdW5jdGlvblxyXG4iLCJpbXBvcnQgeyBtYXQ0IH0gZnJvbSBcIi4uL21hdGgvbWF0NC5qc1wiXHJcbmltcG9ydCB7IHZlYzMgfSBmcm9tIFwiLi4vbWF0aC92ZWMzLmpzXCJcclxuXHJcbmNsYXNzIF9jYW1lcmEge1xyXG4gIGxvYzsgICAvKiBDYW1lcmEgbG9jYXRpb24gKi9cclxuICBhdDsgICAgLyogQ2FtZXJhIGxvb2stYXQgcG9pbnQgKi9cclxuICBkaXI7ICAgLyogQ2FtZXJhIGRpcmVjdGlvbiAqL1xyXG4gIHJpZ2h0OyAvKiBDYW1lcmEgcmlnaHQgZGlyZWN0aW9uICovXHJcbiAgdXA7ICAgIC8qIENhbWVyYSB1cCBkaXJlY3Rpb24gKi9cclxuXHJcbiAgbWF0clZpZXc7IC8qIFZpZXcgbWF0cml4ICovXHJcbiAgbWF0clByb2o7IC8qIFByb2plY3Rpb24gbWF0cml4ICovXHJcbiAgbWF0clZQOyAgIC8qIFN0b3JlZCAoVmlldyAqIFByb2opIG1hdHJpeCAqL1xyXG5cclxuICBmcmFtZVc7IC8qIEZyYW1lIHdpZHRoIChpbiBwaXhlbHMpICovXHJcbiAgZnJhbWVIOyAvKiBGcmFtZSBoZWlnaHQgKGluIHBpeGVscykgKi9cclxuXHJcbiAgd3A7ICAgICAgICAgIC8qIFByb2plY3QgcGxhbmUgc2l6ZSAod2lkdGgpICovXHJcbiAgaHA7ICAgICAgICAgIC8qIFByb2plY3QgcGxhbmUgc2l6ZSAoaGVpZ2h0KSAqL1xyXG4gIHByb2pTaXplOyAgICAvKiBQcm9qZWN0IHBsYW5lIGZpdCBzcXVhcmUgKi9cclxuICBwcm9qRGlzdDsgICAgLyogRGlzdGFuY2UgdG8gcHJvamVjdCBwbGFuZSBmcm9tIHZpZXdlciAobmVhcikgKi9cclxuICBwcm9qRmFyQ2xpcDsgLyogRGlzdGFuY2UgdG8gcHJvamVjdCBmb3IgY2xpcCBwbGFuZSAoZmFyKSAqL1xyXG5cclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHRoaXMubWF0clByb2ogPSBtYXQ0KCk7XHJcbiAgICB0aGlzLm1hdHJWaWV3ID0gbWF0NCgpO1xyXG4gICAgdGhpcy5tYXRyVlAgPSBtYXQ0KCk7XHJcblxyXG4gICAgdGhpcy5mcmFtZUggPSAxMDAwO1xyXG4gICAgdGhpcy5mcmFtZVcgPSAxMDAwO1xyXG5cclxuICAgIHRoaXMucHJvakRpc3QgPSAwLjEwO1xyXG4gICAgdGhpcy5wcm9qRmFyQ2xpcCA9IDMwMDtcclxuICAgIHRoaXMucHJvalNpemUgPSAwLjE7XHJcbiAgfVxyXG4gIHNldChsb2MsIGF0LCB1cClcclxuICB7XHJcbiAgICB0aGlzLm1hdHJWaWV3LnNldFZpZXcobG9jLCBhdCwgdXApO1xyXG5cclxuICAgIHRoaXMucmlnaHQgPSB2ZWMzKHRoaXMubWF0clZpZXcubVswXVswXSxcclxuICAgICAgICAgICAgICAgICAgICAgIHRoaXMubWF0clZpZXcubVsxXVswXSxcclxuICAgICAgICAgICAgICAgICAgICAgIHRoaXMubWF0clZpZXcubVsyXVswXSk7XHJcbiAgICB0aGlzLnVwID0gdmVjMyh0aGlzLm1hdHJWaWV3Lm1bMF1bMV0sXHJcbiAgICAgICAgICAgICAgICAgICB0aGlzLm1hdHJWaWV3Lm1bMV1bMV0sXHJcbiAgICAgICAgICAgICAgICAgICB0aGlzLm1hdHJWaWV3Lm1bMl1bMV0pO1xyXG4gICAgdGhpcy5kaXIgPSB2ZWMzKC10aGlzLm1hdHJWaWV3Lm1bMF1bMl0sXHJcbiAgICAgICAgICAgICAgICAgICAgLXRoaXMubWF0clZpZXcubVsxXVsyXSxcclxuICAgICAgICAgICAgICAgICAgICAtdGhpcy5tYXRyVmlldy5tWzJdWzJdKTtcclxuICAgIHRoaXMubG9jID0gdmVjMyhsb2MpO1xyXG4gICAgdGhpcy5hdCA9IHZlYzMoYXQpO1xyXG5cclxuICAgIHRoaXMubWF0clZQID0gdGhpcy5tYXRyVmlldy5tdWxNYXRyKHRoaXMubWF0clByb2opO1xyXG4gIH0gLy8gRW5kIG9mICdzZXQnIGZ1bmN0aW9uXHJcblxyXG4gIHNldFByb2oocHJvalNpemUsIHByb2pEaXN0LCBwcm9qRmFyQ2xpcClcclxuICB7XHJcbiAgICBsZXQgcngsIHJ5O1xyXG5cclxuICAgIHRoaXMucHJvakRpc3QgPSBwcm9qRGlzdDtcclxuICAgIHRoaXMucHJvakZhckNsaXAgPSBwcm9qRmFyQ2xpcDtcclxuICAgIHJ4ID0gcnkgPSB0aGlzLnByb2pTaXplID0gcHJvalNpemU7XHJcblxyXG4gICAgLyogQ29ycmVjdCBhc3BlY3QgcmF0aW8gKi9cclxuICAgIGlmICh0aGlzLmZyYW1lVyA+PSB0aGlzLmZyYW1lSClcclxuICAgICAgcnggKj0gdGhpcy5mcmFtZVcgLyB0aGlzLmZyYW1lSDtcclxuICAgIGVsc2VcclxuICAgICAgcnkgKj0gdGhpcy5mcmFtZUggLyB0aGlzLmZyYW1lVztcclxuXHJcbiAgICB0aGlzLndwID0gcng7XHJcbiAgICB0aGlzLmhwID0gcnk7XHJcbiAgICB0aGlzLm1hdHJQcm9qLnNldEZydXN0dW0oLXJ4IC8gMiwgcnggLyAyLCAtcnkgLyAyLCByeSAvIDIsIHRoaXMucHJvakRpc3QsIHRoaXMucHJvakZhckNsaXApO1xyXG4gICAgdGhpcy5tYXRyVlAgPSB0aGlzLm1hdHJWaWV3Lm11bE1hdHIodGhpcy5tYXRyUHJvaik7XHJcbiAgfSAvLyBFbmQgb2YgJ3NldFByb2onIGZ1bmN0aW9uXHJcblxyXG4gIHNldFNpemUoZnJhbWVXLCBmcmFtZUgpXHJcbiAge1xyXG4gICAgdGhpcy5mcmFtZVcgPSBmcmFtZVc7XHJcbiAgICB0aGlzLmZyYW1lSCA9IGZyYW1lSDtcclxuICAgIHRoaXMuc2V0UHJvaih0aGlzLnByb2pTaXplLCB0aGlzLnByb2pEaXN0LCB0aGlzLnByb2pGYXJDbGlwKTtcclxuICB9IC8vIEVuZCBvZiAnc2V0U2l6ZScgZnVuY3Rpb25cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGNhbWVyYSgpe1xyXG4gIHJldHVybiBuZXcgX2NhbWVyYSgpO1xyXG59IiwiaW1wb3J0IHsgY2FtZXJhIH0gZnJvbSBcIi4uL21hdGgvY2FtZXJhLmpzXCI7XHJcbmltcG9ydCB7IG1hdDQgfSBmcm9tIFwiLi4vbWF0aC9tYXQ0LmpzXCI7XHJcbmltcG9ydCB7IHZlYzMgfSBmcm9tIFwiLi4vbWF0aC92ZWMzLmpzXCI7XHJcblxyXG5jbGFzcyBfcmVuZGVyT2JqZWN0IHtcclxuICBnbDtcclxuICBjYW52YXM7XHJcbiAgbWFpbkNhbTtcclxuICBzdGFydFRpbWU7XHJcbiAgdGltZTtcclxuXHJcbiAgcHJpbUxpc3QgPSBbXTtcclxuICBcclxuICBjb25zdHJ1Y3RvciAoY2FudmFzSWQpIHtcclxuICAgIHRoaXMuaW5pdChjYW52YXNJZClcclxuICB9XHJcblxyXG4gIGluaXQgKGNhbnZhc0lkKSB7XHJcbiAgICB0aGlzLmNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGNhbnZhc0lkKTtcclxuICAgIHRoaXMuZ2wgPSB0aGlzLmNhbnZhcy5nZXRDb250ZXh0KFwid2ViZ2wyXCIpO1xyXG4gICAgdGhpcy5tYWluQ2FtID0gY2FtZXJhKCk7XHJcblxyXG4gICAgdGhpcy5nbC5lbmFibGUodGhpcy5nbC5ERVBUSF9URVNUKTtcclxuICAgIGNvbnN0IGRhdGUgPSBuZXcgRGF0ZSgpO1xyXG4gICAgdGhpcy50aW1lID0gdGhpcy5zdGFydFRpbWUgPSBkYXRlLmdldE1pbnV0ZXMoKSAqIDYwICtcclxuICAgICAgICAgICAgZGF0ZS5nZXRTZWNvbmRzKCkgK1xyXG4gICAgICAgICAgICBkYXRlLmdldE1pbGxpc2Vjb25kcygpIC8gMTAwMDtcclxuXHJcbiAgICB0aGlzLmdsLmNsZWFyQ29sb3IoMC4zMCwgMC40NywgMC44LCAxKTtcclxuXHJcbiAgfVxyXG5cclxuICBkcmF3RnJhbWUoKSB7XHJcbiAgICBjb25zdCBkYXRlID0gbmV3IERhdGUoKTtcclxuICAgIHRoaXMudGltZSA9IGRhdGUuZ2V0TWludXRlcygpICogNjAgK1xyXG4gICAgICAgICAgICBkYXRlLmdldFNlY29uZHMoKSArXHJcbiAgICAgICAgICAgIGRhdGUuZ2V0TWlsbGlzZWNvbmRzKCkgLyAxMDAwIC0gdGhpcy5zdGFydFRpbWU7XHJcblxyXG4gICAgdGhpcy5nbC5jbGVhcih0aGlzLmdsLkNPTE9SX0JVRkZFUl9CSVQpO1xyXG4gIH1cclxuXHJcbiAgZHJhd1ByaW0ocCkge1xyXG4gICAgcC5wcmltTXRsUHRuLnNoZC5hcHBseSgpO1xyXG5cclxuICAgIC8vbGV0IG1XID0gbWF0NCgpLnJvdGF0ZVkoNDcgKiB0aGlzLnRpbWUpO1xyXG4gICAgbGV0IG1XID0gbWF0NCgpLnJvdGF0ZSg0NyAqIHRoaXMudGltZSwgdmVjMygxLCAxLCAxKS5ub3JtYWxpemUoKSk7XHJcbiAgICBsZXQgbVdWUCA9IG1XLm11bE1hdHIodGhpcy5tYWluQ2FtLm1hdHJWUCk7XHJcbiAgICBsZXQgbVdJbnYgPSBtVy5pbnZlcnNlKCkudHJhbnNwb3NlKCk7XHJcblxyXG4gICAgaWYgKHAucHJpbU10bFB0bi5zaGQudW5pZm9ybXNbXCJNYXRyV1ZQXCJdICE9IHVuZGVmaW5lZClcclxuICAgICAgdGhpcy5nbC51bmlmb3JtTWF0cml4NGZ2KHAucHJpbU10bFB0bi5zaGQudW5pZm9ybXNbXCJNYXRyV1ZQXCJdLmxvYywgZmFsc2UsIG5ldyBGbG9hdDMyQXJyYXkobVdWUC50b0FycmF5KCkpKTtcclxuICAgIGlmIChwLnByaW1NdGxQdG4uc2hkLnVuaWZvcm1zW1wiTWF0cldcIl0gIT0gdW5kZWZpbmVkKSBcclxuICAgICAgdGhpcy5nbC51bmlmb3JtTWF0cml4NGZ2KHAucHJpbU10bFB0bi5zaGQudW5pZm9ybXNbXCJNYXRyV1wiXS5sb2MsIGZhbHNlLCBuZXcgRmxvYXQzMkFycmF5KG1XLnRvQXJyYXkoKSkpO1xyXG4gICAgaWYgKHAucHJpbU10bFB0bi5zaGQudW5pZm9ybXNbXCJNYXRyV0ludlwiXSAhPSB1bmRlZmluZWQpXHJcbiAgICAgIHRoaXMuZ2wudW5pZm9ybU1hdHJpeDRmdihwLnByaW1NdGxQdG4uc2hkLnVuaWZvcm1zW1wiTWF0cldJbnZcIl0ubG9jLCBmYWxzZSwgbmV3IEZsb2F0MzJBcnJheShtV0ludi50b0FycmF5KCkpKTtcclxuICAgIGlmIChwLnByaW1NdGxQdG4uc2hkLnVuaWZvcm1zW1wiVGltZVwiXSAhPSB1bmRlZmluZWQpXHJcbiAgICAgIHRoaXMuZ2wudW5pZm9ybTFmKHAucHJpbU10bFB0bi5zaGQudW5pZm9ybXNbXCJUaW1lXCJdLmxvYywgdGhpcy50aW1lKTtcclxuXHJcbiAgICB0aGlzLmdsLmJpbmRWZXJ0ZXhBcnJheShwLnZlcnRleEFycmF5KTtcclxuICAgIHRoaXMuZ2wuYmluZEJ1ZmZlcih0aGlzLmdsLkFSUkFZX0JVRkZFUiwgcC52ZXJ0ZXhCdWZmZXIpO1xyXG4gICAgaWYgKHAuaW5kZXhCdWZmZXIgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHRoaXMuZ2wuYmluZEJ1ZmZlcih0aGlzLmdsLkVMRU1FTlRfQVJSQVlfQlVGRkVSLCBwLmluZGV4QnVmZmVyKTtcclxuXHJcbiAgICAgIHRoaXMuZ2wuZHJhd0VsZW1lbnRzKHAudHlwZSwgcC5ub29mSSwgdGhpcy5nbC5VTlNJR05FRF9JTlQsIDApO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5nbC5kcmF3QXJyYXlzKHAudHlwZSwgMCwgcC5ub29mVik7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gcmVuZGVyT2JqZWN0KGNhbnZhc0lkKSB7XHJcbiAgcmV0dXJuIG5ldyBfcmVuZGVyT2JqZWN0KGNhbnZhc0lkKTtcclxufSIsIi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuY2xhc3MgX3NoYWRlciB7XHJcbiAgZ2xEcmF3aW5nQ29udGV4dDtcclxuICBuYW1lO1xyXG5cclxuICBhc3luYyBjcmVhdGUoKSB7XHJcbiAgICB0aGlzLmlkID0gbnVsbDtcclxuICAgIHRoaXMuc2hhZGVycyA9XHJcbiAgICBbXHJcbiAgICAgICB7XHJcbiAgICAgICAgIGlkOiBudWxsLFxyXG4gICAgICAgICB0eXBlOiB0aGlzLmdsRHJhd2luZ0NvbnRleHQuVkVSVEVYX1NIQURFUixcclxuICAgICAgICAgbmFtZTogXCJ2ZXJ0XCIsXHJcbiAgICAgICAgIHNyYzogXCJcIixcclxuICAgICAgIH0sXHJcbiAgICAgICB7XHJcbiAgICAgICAgaWQ6IG51bGwsXHJcbiAgICAgICAgdHlwZTogdGhpcy5nbERyYXdpbmdDb250ZXh0LkZSQUdNRU5UX1NIQURFUixcclxuICAgICAgICBuYW1lOiBcImZyYWdcIixcclxuICAgICAgICBzcmM6IFwiXCIsXHJcbiAgICAgICB9XHJcbiAgICBdO1xyXG4gICAgZm9yIChjb25zdCBzIG9mIHRoaXMuc2hhZGVycykge1xyXG4gICAgICBsZXQgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChgYmluL3NoYWRlcnMvJHt0aGlzLm5hbWV9LyR7cy5uYW1lfS5nbHNsYCk7XHJcbiAgICAgIGxldCBzcmMgPSBhd2FpdCByZXNwb25zZS50ZXh0KCk7XHJcbiAgICAgIGlmICh0eXBlb2Ygc3JjID09IFwic3RyaW5nXCIgJiYgc3JjICE9IFwiXCIpXHJcbiAgICAgICAgcy5zcmMgPSBzcmM7XHJcbiAgICB9XHJcbiAgICAvLyByZWNvbXBpbGUgc2hhZGVyc1xyXG4gICAgdGhpcy51cGRhdGVTaGFkZXJzU291cmNlKCk7XHJcbiB9ICBcclxuXHJcbiAgdXBkYXRlU2hhZGVyc1NvdXJjZSgpIHsgXHJcbiAgICB0aGlzLnNoYWRlcnNbMF0uaWQgPSBudWxsO1xyXG4gICAgdGhpcy5zaGFkZXJzWzFdLmlkID0gbnVsbDtcclxuICAgIHRoaXMuaWQgPSBudWxsO1xyXG4gICAgaWYgKHRoaXMuc2hhZGVyc1swXS5zcmMgPT0gXCJcIiB8fCB0aGlzLnNoYWRlcnNbMV0uc3JjID09IFwiXCIpXHJcbiAgICAgIHJldHVybjtcclxuICAgIHRoaXMuc2hhZGVycy5mb3JFYWNoKHMgPT4ge1xyXG4gICAgICBzLmlkID0gdGhpcy5nbERyYXdpbmdDb250ZXh0LmNyZWF0ZVNoYWRlcihzLnR5cGUpO1xyXG4gICAgICB0aGlzLmdsRHJhd2luZ0NvbnRleHQuc2hhZGVyU291cmNlKHMuaWQsIHMuc3JjKTtcclxuICAgICAgdGhpcy5nbERyYXdpbmdDb250ZXh0LmNvbXBpbGVTaGFkZXIocy5pZCk7XHJcbiAgICAgIGlmICghdGhpcy5nbERyYXdpbmdDb250ZXh0LmdldFNoYWRlclBhcmFtZXRlcihzLmlkLCB0aGlzLmdsRHJhd2luZ0NvbnRleHQuQ09NUElMRV9TVEFUVVMpKSB7XHJcbiAgICAgICAgbGV0IGJ1ZiA9IHRoaXMuZ2xEcmF3aW5nQ29udGV4dC5nZXRTaGFkZXJJbmZvTG9nKHMuaWQpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGBTaGFkZXIgJHt0aGlzLm5hbWV9LyR7cy5uYW1lfSBjb21waWxlIGZhaWw6ICR7YnVmfWApO1xyXG4gICAgICB9ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgIH0pOyAgICAgICAgICAgICBcclxuIFxyXG4gICAgdGhpcy5pZCA9IHRoaXMuZ2xEcmF3aW5nQ29udGV4dC5jcmVhdGVQcm9ncmFtKCk7XHJcbiAgICB0aGlzLnNoYWRlcnMuZm9yRWFjaChzID0+IHtcclxuICAgICAgaWYgKHMuaWQgIT0gbnVsbClcclxuICAgICAgICB0aGlzLmdsRHJhd2luZ0NvbnRleHQuYXR0YWNoU2hhZGVyKHRoaXMuaWQsIHMuaWQpO1xyXG4gICAgfSk7XHJcbiAgICB0aGlzLmdsRHJhd2luZ0NvbnRleHQubGlua1Byb2dyYW0odGhpcy5pZCk7XHJcbiAgICBpZiAoIXRoaXMuZ2xEcmF3aW5nQ29udGV4dC5nZXRQcm9ncmFtUGFyYW1ldGVyKHRoaXMuaWQsIHRoaXMuZ2xEcmF3aW5nQ29udGV4dC5MSU5LX1NUQVRVUykpIHtcclxuICAgICAgbGV0IGJ1ZiA9IHRoaXMuZ2xEcmF3aW5nQ29udGV4dC5nZXRQcm9ncmFtSW5mb0xvZyh0aGlzLmlkKTtcclxuICAgICAgY29uc29sZS5sb2coYFNoYWRlciBwcm9ncmFtICR7dGhpcy5uYW1lfSBsaW5rIGZhaWw6ICR7YnVmfWApO1xyXG4gICAgfSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICB0aGlzLnVwZGF0ZVNoYWRlckRhdGEoKTsgICAgXHJcbiAgfVxyXG5cclxuICB1cGRhdGVTaGFkZXJEYXRhKCkge1xyXG4gICAgLy8gU2hhZGVyIGF0dHJpYnV0ZXNcclxuICAgIHRoaXMuYXR0cnMgPSB7fTtcclxuICAgIGNvbnN0IGNvdW50QXR0cnMgPSB0aGlzLmdsRHJhd2luZ0NvbnRleHQuZ2V0UHJvZ3JhbVBhcmFtZXRlcih0aGlzLmlkLCB0aGlzLmdsRHJhd2luZ0NvbnRleHQuQUNUSVZFX0FUVFJJQlVURVMpO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb3VudEF0dHJzOyBpKyspIHtcclxuICAgICAgY29uc3QgaW5mbyA9IHRoaXMuZ2xEcmF3aW5nQ29udGV4dC5nZXRBY3RpdmVBdHRyaWIodGhpcy5pZCwgaSk7XHJcbiAgICAgIHRoaXMuYXR0cnNbaW5mby5uYW1lXSA9IHtcclxuICAgICAgICBuYW1lOiBpbmZvLm5hbWUsXHJcbiAgICAgICAgdHlwZTogaW5mby50eXBlLFxyXG4gICAgICAgIHNpemU6IGluZm8uc2l6ZSxcclxuICAgICAgICBsb2M6IHRoaXMuZ2xEcmF3aW5nQ29udGV4dC5nZXRBdHRyaWJMb2NhdGlvbih0aGlzLmlkLCBpbmZvLm5hbWUpLFxyXG4gICAgICB9O1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvLyBTaGFkZXIgdW5pZm9ybXNcclxuICAgIHRoaXMudW5pZm9ybXMgPSB7fTtcclxuICAgIGNvbnN0IGNvdW50VW5pZm9ybXMgPSB0aGlzLmdsRHJhd2luZ0NvbnRleHQuZ2V0UHJvZ3JhbVBhcmFtZXRlcih0aGlzLmlkLCB0aGlzLmdsRHJhd2luZ0NvbnRleHQuQUNUSVZFX1VOSUZPUk1TKTtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY291bnRVbmlmb3JtczsgaSsrKSB7XHJcbiAgICAgIGNvbnN0IGluZm8gPSB0aGlzLmdsRHJhd2luZ0NvbnRleHQuZ2V0QWN0aXZlVW5pZm9ybSh0aGlzLmlkLCBpKTtcclxuICAgICAgdGhpcy51bmlmb3Jtc1tpbmZvLm5hbWVdID0ge1xyXG4gICAgICAgIG5hbWU6IGluZm8ubmFtZSxcclxuICAgICAgICB0eXBlOiBpbmZvLnR5cGUsXHJcbiAgICAgICAgc2l6ZTogaW5mby5zaXplLFxyXG4gICAgICAgIGxvYzogdGhpcy5nbERyYXdpbmdDb250ZXh0LmdldFVuaWZvcm1Mb2NhdGlvbih0aGlzLmlkLCBpbmZvLm5hbWUpLFxyXG4gICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFNoYWRlciB1bmlmb3JtIGJsb2Nrc1xyXG4gICAgdGhpcy51bmlmb3JtQmxvY2tzID0ge307XHJcbiAgICBjb25zdCBjb3VudFVuaWZvcm1CbG9ja3MgPSB0aGlzLmdsRHJhd2luZ0NvbnRleHQuZ2V0UHJvZ3JhbVBhcmFtZXRlcih0aGlzLmlkLCB0aGlzLmdsRHJhd2luZ0NvbnRleHQuQUNUSVZFX1VOSUZPUk1fQkxPQ0tTKTtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY291bnRVbmlmb3JtQmxvY2tzOyBpKyspIHtcclxuICAgICAgY29uc3QgYmxvY2tfbmFtZSA9IHRoaXMuZ2xEcmF3aW5nQ29udGV4dC5nZXRBY3RpdmVVbmlmb3JtQmxvY2tOYW1lKHRoaXMuaWQsIGkpO1xyXG4gICAgICBjb25zdCBpbmRleCA9IHRoaXMuZ2xEcmF3aW5nQ29udGV4dC5nZXRBY3RpdmVVbmlmb3JtQmxvY2tJbmRleCh0aGlzLmlkLCBibG9ja19uYW1lKTtcclxuICAgICAgdGhpcy51bmlmb3JtQmxvY2tzW2Jsb2NrX25hbWVdID0ge1xyXG4gICAgICAgIG5hbWU6IGJsb2NrX25hbWUsXHJcbiAgICAgICAgaW5kZXg6IGluZGV4LFxyXG4gICAgICAgIHNpemU6IHRoaXMuZ2xEcmF3aW5nQ29udGV4dC5nZXRBY3RpdmVVbmlmb3JtQmxvY2tQYXJhbWV0ZXIodGhpcy5pZCwgaWR4LCB0aGlzLmdsRHJhd2luZ0NvbnRleHQuVU5JRk9STV9CTE9DS19EQVRBX1NJWkUpLFxyXG4gICAgICAgIGJpbmQ6IHRoaXMuZ2xEcmF3aW5nQ29udGV4dC5nZXRBY3RpdmVVbmlmb3JtQmxvY2tQYXJhbWV0ZXIodGhpcy5pZCwgaWR4LCB0aGlzLmdsRHJhd2luZ0NvbnRleHQuVU5JRk9STV9CTE9DS19CSU5ESU5HKSxcclxuICAgICAgfTtcclxuICAgIH1cclxuICAgIFxyXG4gIH1cclxuIFxyXG4gIGNvbnN0cnVjdG9yKG5hbWUsIHJuZE9iaikge1xyXG4gICAgdGhpcy5nbERyYXdpbmdDb250ZXh0ID0gcm5kT2JqLmdsO1xyXG4gICAgdGhpcy5uYW1lID0gbmFtZTtcclxuICB9XHJcbiBcclxuICBhcHBseSgpIHtcclxuICAgIGlmICh0aGlzLmlkICE9IG51bGwpXHJcbiAgICAgIHRoaXMuZ2xEcmF3aW5nQ29udGV4dC51c2VQcm9ncmFtKHRoaXMuaWQpO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHNoYWRlcihuYW1lLCBybmRPYmopIHtcclxuICByZXR1cm4gbmV3IF9zaGFkZXIobmFtZSwgcm5kT2JqKTtcclxufSIsImltcG9ydCB7IHNoYWRlciB9IGZyb20gXCIuL3NoYWRlcnNcIjtcclxuXHJcbmNsYXNzIF9tYXRlcmlhbFBhdHRlcm4ge1xyXG4gIHNoZDtcclxuICBuYW1lO1xyXG4gIHZlcnRleEZvcm1hdDtcclxuXHJcbiAgY29uc3RydWN0b3IodmVydGV4Rm9ybWF0LCBuYW1lLCBzaGROYW1lLCBybmRPYmopIHtcclxuICAgIHRoaXMubmFtZSA9IG5hbWU7XHJcbiAgICB0aGlzLnZlcnRleEZvcm1hdCA9IHZlcnRleEZvcm1hdDtcclxuICAgIHRoaXMuc2hkID0gc2hhZGVyKHNoZE5hbWUsIHJuZE9iaik7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gbWF0ZXJpYWxQYXR0ZXJuKHZlcnRleEZvcm1hdCwgbmFtZSwgc2hkTmFtZSwgcm5kT2JqKSB7XHJcbiAgcmV0dXJuIG5ldyBfbWF0ZXJpYWxQYXR0ZXJuKHZlcnRleEZvcm1hdCwgbmFtZSwgc2hkTmFtZSwgcm5kT2JqKTtcclxufSIsImNsYXNzIF9wcmltIHtcclxuICB2ZXJ0ZXhCdWZmZXI7XHJcbiAgaW5kZXhCdWZmZXI7XHJcbiAgcHJpbU10bFB0bjtcclxuICB2ZXJ0ZXhBcnJheTtcclxuICBub29mViA9IDA7XHJcbiAgbm9vdkkgPSAwO1xyXG4gIHR5cGU7XHJcblxyXG4gIGNvbnN0cnVjdG9yKG10bFB0biwgdHlwZSwgdmVydGV4ZXMsIGluZGV4ZXMpIHtcclxuICAgIGxldCBnbCA9IG10bFB0bi5zaGQuZ2xEcmF3aW5nQ29udGV4dDtcclxuXHJcbiAgICBpZiAodHlwZSA9PSBcInRyaWFuZ2xlc1wiKVxyXG4gICAgICB0aGlzLnR5cGUgPSBtdGxQdG4uc2hkLmdsRHJhd2luZ0NvbnRleHQuVFJJQU5HTEVTO1xyXG4gICAgZWxzZSBpZiAodHlwZSA9PSBcInRyaWFuZ2xlIHN0cmlwXCIpXHJcbiAgICAgIHRoaXMudHlwZSA9IG10bFB0bi5zaGQuZ2xEcmF3aW5nQ29udGV4dC5UUklBTkdMRV9TVFJJUDtcclxuICAgIGVsc2UgaWYgKHR5cGUgPT0gXCJsaW5lIHN0cmlwXCIpXHJcbiAgICAgIHRoaXMudHlwZSA9IG10bFB0bi5zaGQuZ2xEcmF3aW5nQ29udGV4dC5MSU5FX1NUUklQO1xyXG4gICAgZWxzZSBpZiAodHlwZSA9PSBcInRyaWFuZ2xlIGZ1blwiKVxyXG4gICAgICB0aGlzLnR5cGUgPSBtdGxQdG4uc2hkLmdsRHJhd2luZ0NvbnRleHQuVFJJQU5HTEVfRlVOO1xyXG4gICAgZWxzZVxyXG4gICAgICB0aGlzLnR5cGUgPSBtdGxQdG4uc2hkLmdsRHJhd2luZ0NvbnRleHQuUE9JTlRTO1xyXG4gICAgXHJcbiAgICBjb25zdCB2ZXJ0Rm9ybWF0ID0gbXRsUHRuLnZlcnRleEZvcm1hdDsgIFxyXG4gICAgICAvKlxyXG5cclxuICAgIGxldCB2ZXJ0Rm9ybWF0ID0gW1xyXG4gICAgICB7bmFtZSA6IFwiUG9zaXRpb25cIixcclxuICAgICAgIHNpemUgOiAxMn0sXHJcbiAgICAgIHtuYW1lIDogXCJOb3JtYWxcIixcclxuICAgICAgIHNpemUgOiAxMn1cclxuICAgICAgXTsqL1xyXG4gICAgbGV0IHZlcnRTaXplID0gMjQ7XHJcblxyXG4gICAgdGhpcy5ub29mViA9IHZlcnRleGVzLmxlbmd0aCAvICh2ZXJ0U2l6ZSAvIDQpO1xyXG5cclxuICAgIC8vL2NvbnNvbGUubG9nKG10bFB0bi5zaGQpO1xyXG5cclxuICAgIC8vIHZlcnRleCBidWZmZXJcclxuICAgIHRoaXMucHJpbU10bFB0biA9IG10bFB0bjtcclxuICAgIHRoaXMudmVydGV4QnVmZmVyID0gZ2wuY3JlYXRlQnVmZmVyKCk7XHJcbiAgICBnbC5iaW5kQnVmZmVyKGdsLkFSUkFZX0JVRkZFUiwgdGhpcy52ZXJ0ZXhCdWZmZXIpO1xyXG4gICAgZ2wuYnVmZmVyRGF0YShnbC5BUlJBWV9CVUZGRVIsIG5ldyBGbG9hdDMyQXJyYXkodmVydGV4ZXMpLCBnbC5TVEFUSUNfRFJBVyk7XHJcblxyXG4gICAgLy8gaW5kZXggYnVmZmVyXHJcbiAgICBpZiAoaW5kZXhlcyAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgdGhpcy5ub29mSSA9IGluZGV4ZXMubGVuZ3RoO1xyXG4gICAgICB0aGlzLmluZGV4QnVmZmVyID0gZ2wuY3JlYXRlQnVmZmVyKCk7XHJcbiAgICAgIGdsLmJpbmRCdWZmZXIoZ2wuRUxFTUVOVF9BUlJBWV9CVUZGRVIsIHRoaXMuaW5kZXhCdWZmZXIpO1xyXG4gICAgICBnbC5idWZmZXJEYXRhKGdsLkVMRU1FTlRfQVJSQVlfQlVGRkVSLCBuZXcgVWludDMyQXJyYXkoaW5kZXhlcyksIGdsLlNUQVRJQ19EUkFXKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyB2ZXJ0ZXggYXR0cmlic1xyXG4gICAgdGhpcy52ZXJ0ZXhBcnJheT0gZ2wuY3JlYXRlVmVydGV4QXJyYXkoKTtcclxuICAgIGdsLmJpbmRWZXJ0ZXhBcnJheSh0aGlzLnZlcnRleEFycmF5KTtcclxuXHJcbiAgICBsZXQgYWxsU2l6ZSA9IDA7XHJcbiAgICBmb3IgKGxldCBpIGluIHZlcnRGb3JtYXQpIHtcclxuICAgICAgbGV0IGZpbmRlZEF0dHIgPSBtdGxQdG4uc2hkLmF0dHJzW1wiSW5cIiArIHZlcnRGb3JtYXRbaV0ubmFtZV07XHJcblxyXG4gICAgICBpZiAoZmluZGVkQXR0ciAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICBsZXQgYXR0ckxvYyA9IG10bFB0bi5zaGQuYXR0cnNbXCJJblwiICsgdmVydEZvcm1hdFtpXS5uYW1lXS5sb2M7XHJcblxyXG4gICAgICAgIGlmIChhdHRyTG9jICE9IC0xKSB7XHJcbiAgICAgICAgICBnbC52ZXJ0ZXhBdHRyaWJQb2ludGVyKGF0dHJMb2MsIHZlcnRGb3JtYXRbaV0uc2l6ZSAvIDQsIGdsLkZMT0FULCBmYWxzZSwgdmVydFNpemUsIGFsbFNpemUpO1xyXG4gICAgICAgICAgZ2wuZW5hYmxlVmVydGV4QXR0cmliQXJyYXkoYXR0ckxvYyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBhbGxTaXplICs9IHZlcnRGb3JtYXRbaV0uc2l6ZTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHByaW0obXRsUHRuLCB0eXBlLCB2ZXJ0ZXhlcywgaW5kZXhlcykge1xyXG4gIHJldHVybiBuZXcgX3ByaW0obXRsUHRuLCB0eXBlLCB2ZXJ0ZXhlcywgaW5kZXhlcyk7XHJcbn1cclxuIiwiaW1wb3J0IHsgdmVjMyB9IGZyb20gXCIuLi8uLi9tYXRoL3ZlYzMuanNcIlxyXG5cclxuY2xhc3MgX3ZlcnRleCB7XHJcbiAgcG9zO1xyXG4gIG5vcm07XHJcblxyXG4gIGNvbnN0cnVjdG9yKHBvcywgbm9ybSkge1xyXG4gICAgdGhpcy5wb3MgPSBwb3M7XHJcblxyXG4gICAgaWYgKG5vcm0gPT0gdW5kZWZpbmVkKVxyXG4gICAgICB0aGlzLm5vcm0gPSB2ZWMzKDApO1xyXG4gICAgZWxzZSAgXHJcbiAgICAgIHRoaXMubm9ybSA9IG5vcm07XHJcbiAgfVxyXG5cclxuICB0b0FycmF5KCkge1xyXG4gICAgcmV0dXJuIFt0aGlzLnBvcy54LCB0aGlzLnBvcy55LCB0aGlzLnBvcy56LCB0aGlzLm5vcm0ueCwgdGhpcy5ub3JtLnksIHRoaXMubm9ybS56XTtcclxuICB9XHJcblxyXG4gIGNyZWF0ZVZlcnRleEFycmF5KC4uLmFyZ3MpIHtcclxuICAgIGxldCB2cztcclxuXHJcbiAgICBpZiAoYXJncy5sZW5ndGggPT0gMSAmJiBBcnJheS5pc0FycmF5KGFyZ3NbMF0pKVxyXG4gICAgICB2cyA9IGFyZ3NbMF07XHJcbiAgICBlbHNlXHJcbiAgICAgIHZzID0gYXJncztcclxuXHJcbiAgICBsZXQgdiA9IFtdXHJcblxyXG4gICAgdnMuZm9yRWFjaChlbGVtZW50ID0+IHtcclxuICAgICAgdi5wdXNoKC4uLmVsZW1lbnQudG9BcnJheSgpKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiB2O1xyXG4gIH1cclxuXHJcbiAgYXV0b05vcm1hbCh2ZXJ0ZXhlcywgaW5kZXhlcykge1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB2ZXJ0ZXhlcy5sZW5ndGg7IGkrKyl7XHJcbiAgICAgIHZlcnRleGVzW2ldLm5vcm0gPSB2ZWMzKDApO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChpbmRleGVzID09IHVuZGVmaW5lZCkge1xyXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHZlcnRleGVzLmxlbmd0aDsgKXtcclxuICAgICAgICBsZXQgdjEgPSB2ZXJ0ZXhlc1tpICsgMV0ucG9zLnN1YlZlYyh2ZXJ0ZXhlc1tpXS5wb3MpO1xyXG4gICAgICAgIGxldCB2MiA9IHZlcnRleGVzW2kgKyAyXS5wb3Muc3ViVmVjKHZlcnRleGVzW2ldLnBvcyk7XHJcblxyXG4gICAgICAgIGxldCBuID0gdjEuY3Jvc3ModjIpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHZlcnRleGVzW2ldLm5vcm0gPSB2ZXJ0ZXhlc1tpXS5ub3JtLmFkZFZlYyhuKTtcclxuICAgICAgICB2ZXJ0ZXhlc1tpICsgMV0ubm9ybSA9IHZlcnRleGVzW2kgKyAxXS5ub3JtLmFkZFZlYyhuKTtcclxuICAgICAgICB2ZXJ0ZXhlc1tpICsgMl0ubm9ybSA9IHZlcnRleGVzW2kgKyAyXS5ub3JtLmFkZFZlYyhuKTtcclxuXHJcbiAgICAgICAgaSArPSAzO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IGluZGV4ZXMubGVuZ3RoOyApIHtcclxuICAgICAgICBpZiAoaW5kZXhlc1tqXSA9PSAtMSB8fCBpbmRleGVzW2ogKyAxXSA9PSAtMSB8fCBpbmRleGVzW2ogKyAyXSA9PSAtMSkge1xyXG4gICAgICAgICAgaisrO1xyXG4gICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgdjEgPSB2ZXJ0ZXhlc1tpbmRleGVzW2ogKyAxXV0ucG9zLnN1YlZlYyh2ZXJ0ZXhlc1tpbmRleGVzW2pdXS5wb3MpO1xyXG4gICAgICAgIGxldCB2MiA9IHZlcnRleGVzW2luZGV4ZXNbaiArIDJdXS5wb3Muc3ViVmVjKHZlcnRleGVzW2luZGV4ZXNbal1dLnBvcyk7XHJcblxyXG4gICAgICAgIGxldCBuID0gdjEuY3Jvc3ModjIpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHZlcnRleGVzW2luZGV4ZXNbal1dLm5vcm0gPSB2ZXJ0ZXhlc1tpbmRleGVzW2pdXS5ub3JtLmFkZFZlYyhuKTtcclxuICAgICAgICB2ZXJ0ZXhlc1tpbmRleGVzW2ogKyAxXV0ubm9ybSA9IHZlcnRleGVzW2luZGV4ZXNbaiArIDFdXS5ub3JtLmFkZFZlYyhuKTtcclxuICAgICAgICB2ZXJ0ZXhlc1tpbmRleGVzW2ogKyAyXV0ubm9ybSA9IHZlcnRleGVzW2luZGV4ZXNbaiArIDJdXS5ub3JtLmFkZFZlYyhuKTtcclxuXHJcbiAgICAgICAgaiArPSAzO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB2ZXJ0ZXhlcy5sZW5ndGg7IGkrKyl7XHJcbiAgICAgIHZlcnRleGVzW2ldLm5vcm0gPSB2ZXJ0ZXhlc1tpXS5ub3JtLm5vcm1hbGl6ZSgpO1xyXG4gICAgXHJcbiAgICB9ICBcclxuICAgIHJldHVybiB2ZXJ0ZXhlcztcclxuICBcclxuICB9XHJcblxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gdmVydGV4KHBvcywgbm9ybSkge1xyXG4gIHJldHVybiBuZXcgX3ZlcnRleChwb3MsIG5vcm0pO1xyXG59IiwiaW1wb3J0IHsgdmVjMyB9IGZyb20gXCIuLi8uLi9tYXRoL3ZlYzNcIjtcclxuaW1wb3J0IHsgcHJpbSB9IGZyb20gXCIuL3ByaW1cIjtcclxuaW1wb3J0IHsgdmVydGV4IH0gZnJvbSBcIi4vdmVydGV4XCI7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gY3ViZUNyZWF0ZShtdGxQdG4sIHNpemUpIHtcclxuICBsZXQgcG50cyA9IFtcclxuICAgIHZlYzMoLTEsIC0xLCAtMSksIHZlYzMoMSwgLTEsIC0xKSxcclxuICAgIHZlYzMoMSwgLTEsIDEpLCB2ZWMzKC0xLCAtMSwgMSksXHJcbiAgICB2ZWMzKC0xLCAxLCAtMSksIHZlYzMoMSwgMSwgLTEpLFxyXG4gICAgdmVjMygxLCAxLCAxKSwgdmVjMygtMSwgMSwgMSksXHJcbiAgXTtcclxuICBcclxuICBsZXQgaW5kID0gW1xyXG4gICAgMSwgMCwgMiwgMywgLTEsXHJcbiAgICA1LCA2LCAxLCAyLCAtMSxcclxuICAgIDYsIDcsIDIsIDMsIC0xLFxyXG4gICAgNywgNCwgMywgMCwgLTEsXHJcbiAgICA0LCA1LCAwLCAxLCAtMSxcclxuICAgIDQsIDUsIDcsIDYsIC0xLFxyXG4gIF07XHJcblxyXG4gIGxldCBub3JtcyA9IFtcclxuICAgIHZlYzMoMCwgLTEsIDApLCB2ZWMzKDEsIDAsIDApLFxyXG4gICAgdmVjMygwLCAwLCAxKSwgdmVjMygtMSwgMCwgMCksXHJcbiAgICB2ZWMzKDAsIDAsIC0xKSwgdmVjMygwLCAxLCAwKSxcclxuICBdXHJcblxyXG4gIGxldCB2ZXJ0ID0gW107XHJcblxyXG4gIGxldCB1SW5kID0gW107XHJcblxyXG4gIGxldCBqID0gMDtcclxuICBmb3IgKGxldCBpID0gMDsgaSA8IGluZC5sZW5ndGg7IGkrKykge1xyXG4gICAgaWYgKGluZFtpXSAhPSAtMSkge1xyXG4gICAgICB2ZXJ0LnB1c2godmVydGV4KHBudHNbaW5kW2ldXS5tdWxOdW0oc2l6ZSksIG5vcm1zW01hdGguZmxvb3IoaSAvIDUpXSkpO1xyXG4gICAgICB1SW5kLnB1c2goaik7XHJcbiAgICAgIGorKztcclxuICAgIH1cclxuICAgIGVsc2VcclxuICAgICAgdUluZC5wdXNoKC0xKTtcclxuICB9XHJcblxyXG4gIGxldCB2ZXJ0ZXhBcnIgPSB2ZXJ0ZXgoKS5jcmVhdGVWZXJ0ZXhBcnJheSh2ZXJ0KTtcclxuXHJcbiAgcmV0dXJuIHByaW0obXRsUHRuLCBcInRyaWFuZ2xlIHN0cmlwXCIsIHZlcnRleEFyciwgdUluZCk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBvY3RDcmVhdGUobXRsUHRuLCBzaXplKSB7XHJcbiAgbGV0IHBudHMgPSBbXHJcbiAgICB2ZWMzKDAsIDEsIDApLCB2ZWMzKDAsIDAsIDEpLFxyXG4gICAgdmVjMygtMSwgMCwgMCksIHZlYzMoMCwgMCwgLTEpLFxyXG4gICAgdmVjMygxLCAwLCAwKSwgdmVjMygwLCAtMSwgMCksXHJcbiAgXTtcclxuICBcclxuICBsZXQgaW5kID0gW1xyXG4gICAgMCwgMSwgMixcclxuICAgIDAsIDIsIDMsXHJcbiAgICAwLCAzLCA0LFxyXG4gICAgMCwgNCwgMSxcclxuICAgIDUsIDEsIDIsXHJcbiAgICA1LCAyLCAzLFxyXG4gICAgNSwgMywgNCxcclxuICAgIDUsIDQsIDEsXHJcbiAgXTtcclxuXHJcbiAgbGV0IHZlcnQgPSBbXTtcclxuXHJcbiAgbGV0IHVJbmQgPSBbXTtcclxuXHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBpbmQubGVuZ3RoOyBpKyspIHtcclxuICAgIHZlcnQucHVzaCh2ZXJ0ZXgocG50c1tpbmRbaV1dLm11bE51bShzaXplKSkpO1xyXG4gIH1cclxuXHJcbiAgdmVydCA9IHZlcnRleCgpLmF1dG9Ob3JtYWwodmVydCk7XHJcblxyXG4gIGxldCB2ZXJ0ZXhBcnIgPSB2ZXJ0ZXgoKS5jcmVhdGVWZXJ0ZXhBcnJheSh2ZXJ0KTtcclxuXHJcbiAgcmV0dXJuIHByaW0obXRsUHRuLCBcInRyaWFuZ2xlc1wiLCB2ZXJ0ZXhBcnIpO1xyXG5cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHRldHJDcmVhdGUobXRsUHRuLCBzaXplKSB7XHJcbiAgY29uc3Qgc3FydDMgPSBNYXRoLnNxcnQoMyk7XHJcbiAgY29uc3Qgc3FydDIzID0gTWF0aC5zcXJ0KDIgLyAzKTtcclxuXHJcbiAgbGV0IHZ0ID0gW1xyXG4gICAgdmVydGV4KHZlYzMoMCwgMCwgc3FydDMgLyAzKSksIHZlcnRleCh2ZWMzKDAuNSwgMCwgLXNxcnQzIC8gNikpLCB2ZXJ0ZXgodmVjMygtMC41LCAwLCAtc3FydDMgLyA2KSksXHJcbiAgICB2ZXJ0ZXgodmVjMygwLCBzcXJ0MjMsIDApKSwgdmVydGV4KHZlYzMoMC41LCAwLCAtc3FydDMgLyA2KSksIHZlcnRleCh2ZWMzKC0wLjUsIDAsIC1zcXJ0MyAvIDYpKSxcclxuICAgIHZlcnRleCh2ZWMzKDAsIHNxcnQyMywgMCkpLCB2ZXJ0ZXgodmVjMygwLjUsIDAsIC1zcXJ0MyAvIDYpKSwgdmVydGV4KHZlYzMoMCwgMCwgc3FydDMgLyAzKSksXHJcbiAgICB2ZXJ0ZXgodmVjMygwLCBzcXJ0MjMsIDApKSwgdmVydGV4KHZlYzMoLTAuNSwgMCwgLXNxcnQzIC8gNikpLCB2ZXJ0ZXgodmVjMygwLCAwLCBzcXJ0MyAvIDMpKSxcclxuICBdO1xyXG5cclxuICB2dC5mb3JFYWNoKCh2ZXJ0KSA9PiB7XHJcbiAgICB2ZXJ0LnBvcyA9IHZlcnQucG9zLm11bE51bShzaXplKTtcclxuICB9KVxyXG5cclxuICB2dCA9IHZlcnRleCgpLmF1dG9Ob3JtYWwodnQpO1xyXG5cclxuICB2dCA9IHZlcnRleCgpLmNyZWF0ZVZlcnRleEFycmF5KHZ0KTtcclxuXHJcbiAgcmV0dXJuIHByaW0obXRsUHRuLCBcInRyaWFuZ2xlc1wiLCB2dCk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBpY29DcmVhdGUobXRsUHRuLCBzaXplKSB7XHJcbiAgY29uc3QgXHJcbiAgICBzcXJ0NWQyID0gTWF0aC5zcXJ0KDUpIC8gMixcclxuICAgIHNpbjcyID0gTWF0aC5zaW4oNzIgKiBNYXRoLlBJIC8gMTgwKSxcclxuICAgIGNvczcyID0gTWF0aC5jb3MoNzIgKiBNYXRoLlBJIC8gMTgwKTtcclxuXHJcbiAgbGV0IHBudHMgPSBbXHJcbiAgICB2ZWMzKDAsIHNxcnQ1ZDIsIDApXHJcbiAgXVxyXG5cclxuICBmb3IgKGxldCBpID0gMDsgaSA8IDU7IGkrKykge1xyXG4gICAgcG50cy5wdXNoKHZlYzMoTWF0aC5jb3MoKDcyICogaSkgKiBNYXRoLlBJIC8xODApLCAwLjUsIE1hdGguc2luKCg3MiAqIGkpICogTWF0aC5QSSAvMTgwKSkpO1xyXG4gIH1cclxuXHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCA1OyBpKyspIHtcclxuICAgIHBudHMucHVzaCh2ZWMzKC1NYXRoLmNvcygoNzIgKiBpKSAqIE1hdGguUEkgLzE4MCksIC0wLjUsIC1NYXRoLnNpbigoNzIgKiBpKSAqIE1hdGguUEkgLzE4MCkpKTtcclxuICB9XHJcblxyXG4gIHBudHMucHVzaCh2ZWMzKDAsIC1zcXJ0NWQyLCAwKSk7XHJcblxyXG4gIGxldCBpbmQgPSBbXHJcbiAgICAwLCAxLCAyLFxyXG4gICAgMCwgMiwgMyxcclxuICAgIDAsIDMsIDQsXHJcbiAgICAwLCA0LCA1LFxyXG4gICAgMCwgNSwgMSxcclxuICAgIDEsIDksIDgsIFxyXG4gICAgMSwgMiwgOSxcclxuICAgIDIsIDEwLCA5LFxyXG4gICAgMiwgMywgMTAsXHJcbiAgICAzLCA2LCAxMCxcclxuICAgIDMsIDQsIDYsXHJcbiAgICA0LCA3LCA2LFxyXG4gICAgNCwgNSwgNyxcclxuICAgIDUsIDgsIDcsXHJcbiAgICA1LCAxLCA4LFxyXG4gICAgMTEsIDYsIDcsXHJcbiAgICAxMSwgNywgOCxcclxuICAgIDExLCA4LCA5LFxyXG4gICAgMTEsIDksIDEwLFxyXG4gICAgMTEsIDEwLCA2LFxyXG4gIF07XHJcblxyXG4gIGxldCB2ZXJ0ID0gW107XHJcblxyXG4gIGZvciAobGV0IGkgaW4gaW5kKSB7XHJcbiAgICB2ZXJ0LnB1c2godmVydGV4KHBudHNbaW5kW2ldXS5tdWxOdW0oc2l6ZSkpKTtcclxuICB9XHJcblxyXG4gIHZlcnRleCgpLmF1dG9Ob3JtYWwodmVydCk7XHJcbiAgXHJcbiAgbGV0IHZlcnRleEFyciA9IHZlcnRleCgpLmNyZWF0ZVZlcnRleEFycmF5KHZlcnQpO1xyXG5cclxuICByZXR1cm4gcHJpbShtdGxQdG4sIFwidHJpYW5nbGVzXCIsIHZlcnRleEFycik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBkb2RlY0NyZWF0ZShtdGxQdG4sIHNpemUpIHtcclxuICBjb25zdCBcclxuICAgIHNxcnQ1ZDIgPSBNYXRoLnNxcnQoNSkgLyAyLFxyXG4gICAgc2luNzIgPSBNYXRoLnNpbig3MiAqIE1hdGguUEkgLyAxODApLFxyXG4gICAgY29zNzIgPSBNYXRoLmNvcyg3MiAqIE1hdGguUEkgLyAxODApO1xyXG5cclxuICBsZXQgcG50czAgPSBbXHJcbiAgICB2ZWMzKDAsIHNxcnQ1ZDIsIDApXHJcbiAgXVxyXG5cclxuICBmb3IgKGxldCBpID0gMDsgaSA8IDU7IGkrKykge1xyXG4gICAgcG50czAucHVzaCh2ZWMzKE1hdGguY29zKCg3MiAqIGkpICogTWF0aC5QSSAvMTgwKSwgMC41LCBNYXRoLnNpbigoNzIgKiBpKSAqIE1hdGguUEkgLzE4MCkpKTtcclxuICB9XHJcblxyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgNTsgaSsrKSB7XHJcbiAgICBwbnRzMC5wdXNoKHZlYzMoLU1hdGguY29zKCg3MiAqIGkpICogTWF0aC5QSSAvMTgwKSwgLTAuNSwgLU1hdGguc2luKCg3MiAqIGkpICogTWF0aC5QSSAvMTgwKSkpO1xyXG4gIH1cclxuXHJcbiAgcG50czAucHVzaCh2ZWMzKDAsIC1zcXJ0NWQyLCAwKSk7XHJcblxyXG4gIGxldCBpbmQgPSBbXHJcbiAgICAwLCAxLCAyLFxyXG4gICAgMCwgMiwgMyxcclxuICAgIDAsIDMsIDQsXHJcbiAgICAwLCA0LCA1LFxyXG4gICAgMCwgNSwgMSxcclxuICAgIDEsIDksIDgsIFxyXG4gICAgMSwgMiwgOSxcclxuICAgIDIsIDEwLCA5LFxyXG4gICAgMiwgMywgMTAsXHJcbiAgICAzLCA2LCAxMCxcclxuICAgIDMsIDQsIDYsXHJcbiAgICA0LCA3LCA2LFxyXG4gICAgNCwgNSwgNyxcclxuICAgIDUsIDgsIDcsXHJcbiAgICA1LCAxLCA4LFxyXG4gICAgMTEsIDYsIDcsXHJcbiAgICAxMSwgNywgOCxcclxuICAgIDExLCA4LCA5LFxyXG4gICAgMTEsIDksIDEwLFxyXG4gICAgMTEsIDEwLCA2LFxyXG4gIF07XHJcblxyXG4gIGxldCBwbnRzMSA9IFtdO1xyXG5cclxuICBmb3IgKGxldCBpID0gMDsgaSA8IGluZC5sZW5ndGg7IGkgKz0gMykge1xyXG4gICAgcG50czEucHVzaChwbnRzMFtpbmRbaV1dLmFkZFZlYyhwbnRzMFtpbmRbaSArIDFdXSkuYWRkVmVjKHBudHMwW2luZFtpICsgMl1dKS5kaXZOdW0oMykpO1xyXG4gIH1cclxuXHJcbiAgbGV0IGluZGV4ZXMgPSBbXHJcbiAgICAwLCAxLCAyLCAwLCAyLCAzLCAwLCAzLCA0LFxyXG4gICAgMCwgMSwgOCwgMCwgOCwgNywgMCwgNywgNixcclxuICAgIDEsIDIsIDEwLCAxLCAxMCwgOSwgMSwgOSwgOCxcclxuICAgIDIsIDMsIDEyLCAyLCAxMiwgMTEsIDIsIDExLCAxMCxcclxuICAgIDMsIDQsIDE0LCAzLCAxNCwgMTMsIDMsIDEzLCAxMixcclxuICAgIDQsIDAsIDYsIDQsIDYsIDUsIDQsIDUsIDE0LFxyXG4gICAgNywgOCwgOSwgNywgOSwgMTksIDcsIDE5LCAxOCxcclxuICAgIDksIDEwLCAxMSwgOSwgMTEsIDE1LCA5LCAxNSwgMTksXHJcbiAgICAxMSwgMTIsIDEzLCAxMSwgMTMsIDE2LCAxMSwgMTYsIDE1LFxyXG4gICAgMTMsIDE0LCA1LCAxMywgNSwgMTcsIDEzLCAxNywgMTYsXHJcbiAgICA1LCA2LCA3LCA1LCA3LCAxOCwgNSwgMTgsIDE3LFxyXG4gICAgMTUsIDE2LCAxNywgMTUsIDE3LCAxOCwgMTUsIDE4LCAxOSxcclxuICBdXHJcblxyXG4gIGxldCB2ZXJ0ID0gW107XHJcblxyXG4gIGZvciAobGV0IGkgaW4gaW5kZXhlcykge1xyXG4gICAgdmVydC5wdXNoKHZlcnRleChwbnRzMVtpbmRleGVzW2ldXS5tdWxOdW0oc2l6ZSkpKTtcclxuICB9XHJcblxyXG4gIHZlcnRleCgpLmF1dG9Ob3JtYWwodmVydCk7XHJcbiAgXHJcbiAgbGV0IHZlcnRleEFyciA9IHZlcnRleCgpLmNyZWF0ZVZlcnRleEFycmF5KHZlcnQpO1xyXG5cclxuICByZXR1cm4gcHJpbShtdGxQdG4sIFwidHJpYW5nbGVzXCIsIHZlcnRleEFycik7XHJcbn0iLCJpbXBvcnQgeyByZW5kZXJPYmplY3QgfSBmcm9tIFwiLi9yZW5kZXIvcmVuZF9kZWYuanNcIjtcclxuaW1wb3J0IHsgbWF0ZXJpYWxQYXR0ZXJuIH0gZnJvbSBcIi4vcmVuZGVyL3Jlcy9tYXRlcmlhbF9wYXR0ZXJuLmpzXCI7XHJcbmltcG9ydCB7IHByaW0gfSBmcm9tIFwiLi9yZW5kZXIvcmVzL3ByaW0uanNcIjtcclxuaW1wb3J0IHsgc2hhZGVyIH0gZnJvbSBcIi4vcmVuZGVyL3Jlcy9zaGFkZXJzLmpzXCI7XHJcbmltcG9ydCB7IHZlYzMgfSBmcm9tIFwiLi9tYXRoL3ZlYzMuanNcIjtcclxuaW1wb3J0IHsgdGV0ckNyZWF0ZSwgY3ViZUNyZWF0ZSwgb2N0Q3JlYXRlLCBpY29DcmVhdGUsIGRvZGVjQ3JlYXRlIH0gZnJvbSBcIi4vcmVuZGVyL3Jlcy9maWd1cmVzLmpzXCI7XHJcblxyXG5mdW5jdGlvbiBtYWluMSgpIHtcclxuICBsZXQgbWFpblJuZDtcclxuICBsZXQgZnN0TXRsUHRuO1xyXG4gIGxldCBmc3RQcmltO1xyXG5cclxuXHJcbiAgbWFpblJuZCA9IHJlbmRlck9iamVjdChcIm1haW5DYW52YXNcIik7XHJcbiAgXHJcbiAgbWFpblJuZC5tYWluQ2FtLnNldCh2ZWMzKDAsIDAsIDMpLCB2ZWMzKDAsIDAsIDApLCB2ZWMzKDAsIDEsIDApKTtcclxuICBtYWluUm5kLm1haW5DYW0uc2V0U2l6ZSgxMDAwLCAxMDAwKTtcclxuXHJcbiAgZnN0TXRsUHRuID0gbWF0ZXJpYWxQYXR0ZXJuKFwiZnN0XCIsIFwiZGVmYXVsdFwiLCBtYWluUm5kKTtcclxuXHJcbiAgY29uc3QgZHJhdyA9ICgpID0+IHtcclxuICAgIC8vIGRyYXdpbmdcclxuICAgIG1haW5SbmQuZHJhd0ZyYW1lKCk7XHJcblxyXG4gICAgbWFpblJuZC5kcmF3UHJpbShmc3RQcmltKTtcclxuICAgIC8vIGFuaW1hdGlvbiByZWdpc3RlclxyXG4gICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShkcmF3KTtcclxuICAgIH07XHJcblxyXG5cclxuXHJcbiAgY29uc3QgZ2wgPSBtYWluUm5kLmdsO1xyXG5cclxuICAvLyAvL3ByaW0oZnN0TXRsUHRuLCBcInRyaWFuZ2xlIHN0cmlwXCIsIG5ldyBGbG9hdDMyQXJyYXkoWzEsIDAsIDAsIDAsIDEsIDAsIDAsIDAsIDAsIDAsIDEsIDAsIDEsIDAsIDEsIDAsIDEsIDAsIDAsIDAsIDEsIDAsIDEsIDBdKSlcclxuXHJcbiAgZnN0TXRsUHRuLnNoZC5jcmVhdGUoKS50aGVuKCgpID0+IHtmc3RQcmltID0gY3ViZUNyZWF0ZShmc3RNdGxQdG4sIDAuNSk7fSkudGhlbigoKSA9PiB7XHJcbiAgICBkcmF3KCk7fSk7XHJcbn0gXHJcblxyXG5mdW5jdGlvbiBtYWluMigpIHtcclxuICBsZXQgbWFpblJuZDtcclxuICBsZXQgZnN0TXRsUHRuO1xyXG4gIGxldCBmc3RQcmltLCBzY25kUHJpbTtcclxuXHJcblxyXG4gIG1haW5SbmQgPSByZW5kZXJPYmplY3QoXCJzZWNvbmRDYW52YXNcIik7XHJcbiAgXHJcbiAgbWFpblJuZC5tYWluQ2FtLnNldCh2ZWMzKDAsIDMsIDMpLCB2ZWMzKDAsIDAsIDApLCB2ZWMzKDAsIDEsIDApKTtcclxuICBtYWluUm5kLm1haW5DYW0uc2V0U2l6ZSgxMDAwLCAxMDAwKTtcclxuXHJcbiAgZnN0TXRsUHRuID0gbWF0ZXJpYWxQYXR0ZXJuKFwiZnN0XCIsIFwiZGVmYXVsdFwiLCBtYWluUm5kKTtcclxuXHJcbiAgY29uc3QgZHJhdyA9ICgpID0+IHtcclxuICAgIC8vIGRyYXdpbmdcclxuICAgIG1haW5SbmQuZHJhd0ZyYW1lKCk7XHJcblxyXG4gICAgbWFpblJuZC5kcmF3UHJpbShmc3RQcmltKTtcclxuICAgIC8vIGFuaW1hdGlvbiByZWdpc3RlclxyXG4gICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShkcmF3KTtcclxuICAgIH07XHJcblxyXG5cclxuXHJcbiAgY29uc3QgZ2wgPSBtYWluUm5kLmdsO1xyXG5cclxuICAvLyAvL3ByaW0oZnN0TXRsUHRuLCBcInRyaWFuZ2xlIHN0cmlwXCIsIG5ldyBGbG9hdDMyQXJyYXkoWzEsIDAsIDAsIDAsIDEsIDAsIDAsIDAsIDAsIDAsIDEsIDAsIDEsIDAsIDEsIDAsIDEsIDAsIDAsIDAsIDEsIDAsIDEsIDBdKSlcclxuXHJcbiAgZnN0TXRsUHRuLnNoZC5jcmVhdGUoKS50aGVuKCgpID0+IHtcclxuICAgIGZzdFByaW0gPSB0ZXRyQ3JlYXRlKGZzdE10bFB0biwgMik7XHJcbiAgfSkudGhlbigoKSA9PiB7XHJcbiAgICBkcmF3KCk7fSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIG1haW4zKCkge1xyXG4gIGxldCBtYWluUm5kO1xyXG4gIGxldCBmc3RNdGxQdG47XHJcbiAgbGV0IGZzdFByaW07XHJcblxyXG5cclxuICBtYWluUm5kID0gcmVuZGVyT2JqZWN0KFwidGhpcmRDYW52YXNcIik7XHJcbiAgXHJcbiAgbWFpblJuZC5tYWluQ2FtLnNldCh2ZWMzKDAsIDAuOCwgMyksIHZlYzMoMCwgMCwgMCksIHZlYzMoMCwgMSwgMCkpO1xyXG4gIG1haW5SbmQubWFpbkNhbS5zZXRTaXplKDEwMDAsIDEwMDApO1xyXG5cclxuICBmc3RNdGxQdG4gPSBtYXRlcmlhbFBhdHRlcm4oXCJmc3RcIiwgXCJkZWZhdWx0XCIsIG1haW5SbmQpO1xyXG5cclxuICBjb25zdCBkcmF3ID0gKCkgPT4ge1xyXG4gICAgLy8gZHJhd2luZ1xyXG4gICAgbWFpblJuZC5kcmF3RnJhbWUoKTtcclxuXHJcbiAgICBtYWluUm5kLmRyYXdQcmltKGZzdFByaW0pO1xyXG4gICAgLy8gYW5pbWF0aW9uIHJlZ2lzdGVyXHJcbiAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKGRyYXcpO1xyXG4gICAgfTtcclxuXHJcblxyXG5cclxuICBjb25zdCBnbCA9IG1haW5SbmQuZ2w7XHJcblxyXG4gIC8vIC8vcHJpbShmc3RNdGxQdG4sIFwidHJpYW5nbGUgc3RyaXBcIiwgbmV3IEZsb2F0MzJBcnJheShbMSwgMCwgMCwgMCwgMSwgMCwgMCwgMCwgMCwgMCwgMSwgMCwgMSwgMCwgMSwgMCwgMSwgMCwgMCwgMCwgMSwgMCwgMSwgMF0pKVxyXG5cclxuICBmc3RNdGxQdG4uc2hkLmNyZWF0ZSgpLnRoZW4oKCkgPT4ge2ZzdFByaW0gPSBvY3RDcmVhdGUoZnN0TXRsUHRuLCAxKTt9KS50aGVuKCgpID0+IHtcclxuICAgIGRyYXcoKTt9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gbWFpbjQoKSB7XHJcbiAgbGV0IG1haW5SbmQ7XHJcbiAgbGV0IGZzdE10bFB0bjtcclxuICBsZXQgZnN0UHJpbTtcclxuXHJcblxyXG4gIG1haW5SbmQgPSByZW5kZXJPYmplY3QoXCJpY29DYW52YXNcIik7XHJcbiAgXHJcbiAgbWFpblJuZC5tYWluQ2FtLnNldCh2ZWMzKDAsIDMsIDMpLCB2ZWMzKDAsIDAsIDApLCB2ZWMzKDAsIDEsIDApKTtcclxuICBtYWluUm5kLm1haW5DYW0uc2V0U2l6ZSgxMDAwLCAxMDAwKTtcclxuXHJcbiAgZnN0TXRsUHRuID0gbWF0ZXJpYWxQYXR0ZXJuKFwiZnN0XCIsIFwiZGVmYXVsdFwiLCBtYWluUm5kKTtcclxuXHJcbiAgY29uc3QgZHJhdyA9ICgpID0+IHtcclxuICAgIC8vIGRyYXdpbmdcclxuICAgIG1haW5SbmQuZHJhd0ZyYW1lKCk7XHJcblxyXG4gICAgbWFpblJuZC5kcmF3UHJpbShmc3RQcmltKTtcclxuICAgIC8vIGFuaW1hdGlvbiByZWdpc3RlclxyXG4gICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShkcmF3KTtcclxuICAgIH07XHJcblxyXG5cclxuXHJcbiAgY29uc3QgZ2wgPSBtYWluUm5kLmdsO1xyXG5cclxuICAvLyAvL3ByaW0oZnN0TXRsUHRuLCBcInRyaWFuZ2xlIHN0cmlwXCIsIG5ldyBGbG9hdDMyQXJyYXkoWzEsIDAsIDAsIDAsIDEsIDAsIDAsIDAsIDAsIDAsIDEsIDAsIDEsIDAsIDEsIDAsIDEsIDAsIDAsIDAsIDEsIDAsIDEsIDBdKSlcclxuXHJcbiAgZnN0TXRsUHRuLnNoZC5jcmVhdGUoKS50aGVuKCgpID0+IHtmc3RQcmltID0gaWNvQ3JlYXRlKGZzdE10bFB0biwgMSk7fSkudGhlbigoKSA9PiB7XHJcbiAgICBkcmF3KCk7fSk7XHJcbn0gXHJcblxyXG5mdW5jdGlvbiBtYWluNSgpIHtcclxuICBsZXQgbWFpblJuZDtcclxuICBsZXQgZnN0TXRsUHRuO1xyXG4gIGxldCBmc3RQcmltO1xyXG5cclxuXHJcbiAgbWFpblJuZCA9IHJlbmRlck9iamVjdChcImRvZGVjQ2FudmFzXCIpO1xyXG4gIFxyXG4gIG1haW5SbmQubWFpbkNhbS5zZXQodmVjMygwLCAzLCAzKSwgdmVjMygwLCAwLCAwKSwgdmVjMygwLCAxLCAwKSk7XHJcbiAgbWFpblJuZC5tYWluQ2FtLnNldFNpemUoMTAwMCwgMTAwMCk7XHJcblxyXG4gIGZzdE10bFB0biA9IG1hdGVyaWFsUGF0dGVybihcImZzdFwiLCBcImRlZmF1bHRcIiwgbWFpblJuZCk7XHJcblxyXG4gIGNvbnN0IGRyYXcgPSAoKSA9PiB7XHJcbiAgICAvLyBkcmF3aW5nXHJcbiAgICBtYWluUm5kLmRyYXdGcmFtZSgpO1xyXG5cclxuICAgIG1haW5SbmQuZHJhd1ByaW0oZnN0UHJpbSk7XHJcbiAgICAvLyBhbmltYXRpb24gcmVnaXN0ZXJcclxuICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZHJhdyk7XHJcbiAgICB9O1xyXG5cclxuXHJcblxyXG4gIGNvbnN0IGdsID0gbWFpblJuZC5nbDtcclxuXHJcbiAgLy8gLy9wcmltKGZzdE10bFB0biwgXCJ0cmlhbmdsZSBzdHJpcFwiLCBuZXcgRmxvYXQzMkFycmF5KFsxLCAwLCAwLCAwLCAxLCAwLCAwLCAwLCAwLCAwLCAxLCAwLCAxLCAwLCAxLCAwLCAxLCAwLCAwLCAwLCAxLCAwLCAxLCAwXSkpXHJcblxyXG4gIGZzdE10bFB0bi5zaGQuY3JlYXRlKCkudGhlbigoKSA9PiB7ZnN0UHJpbSA9IGRvZGVjQ3JlYXRlKGZzdE10bFB0biwgMSk7fSkudGhlbigoKSA9PiB7XHJcbiAgICBkcmF3KCk7fSk7XHJcbn0gXHJcblxyXG5cclxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsICgpID0+IHtcclxuICBtYWluMSgpO1xyXG4gIG1haW4yKCk7XHJcbiAgbWFpbjMoKTtcclxuICBtYWluNCgpO1xyXG4gIG1haW41KCk7XHJcbn0pO1xyXG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0VBQUEsTUFBTSxLQUFLLENBQUM7RUFDWixFQUFFLENBQUM7RUFDSCxFQUFFO0VBQ0YsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztFQUNoQixJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0VBQ2hCLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7RUFDaEIsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztFQUNoQixHQUFHLENBQUM7RUFDSjtFQUNBLEVBQUUsV0FBVyxDQUFDLEdBQUcsSUFBSSxFQUFFO0VBQ3ZCLElBQUksSUFBSSxJQUFJLENBQUMsTUFBTSxJQUFJLENBQUMsS0FBSyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLE9BQU8sSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLFFBQVE7RUFDcEYsTUFBTSxJQUFJLENBQUMsQ0FBQztFQUNaLE1BQU07RUFDTixRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3hELFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDeEQsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztFQUMxRCxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0VBQzVELE9BQU8sQ0FBQztFQUNSO0VBQ0E7RUFDQTtFQUNBLFNBQVMsSUFBSSxJQUFJLENBQUMsTUFBTSxJQUFJLENBQUMsSUFBSSxPQUFPLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxRQUFRLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUN0RixNQUFNLElBQUksQ0FBQyxDQUFDO0VBQ1osTUFBTTtFQUNOLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzVFLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzVFLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzVFLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzVFLE9BQU8sQ0FBQztFQUNSLFNBQVMsSUFBSSxJQUFJLENBQUMsTUFBTSxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxJQUFJLENBQUMsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFO0VBQ25GLE1BQU0sS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUU7RUFDaEMsUUFBUSxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRTtFQUNsQyxVQUFVLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3ZDLEtBQUssTUFBTSxJQUFJLElBQUksQ0FBQyxNQUFNLElBQUksQ0FBQyxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUU7RUFDM0QsTUFBTSxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRTtFQUNoQyxRQUFRLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFO0VBQ2xDLFVBQVUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEMsS0FBSyxNQUFNLElBQUksSUFBSSxDQUFDLE1BQU0sSUFBSSxFQUFFLEVBQUU7RUFDbEMsUUFBUSxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRTtFQUNsQyxVQUFVLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFO0VBQ3BDLFlBQVksSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztFQUMzQyxLQUFLLE1BQU0sSUFBSSxJQUFJLENBQUMsTUFBTSxJQUFJLENBQUMsSUFBSSxPQUFPLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxRQUFRLEVBQUU7RUFDL0QsUUFBUSxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRTtFQUNsQyxVQUFVLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFO0VBQ3BDLFlBQVksSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDbkMsS0FBSztFQUNMLEdBQUc7QUFDSDtFQUNBLEVBQUUsV0FBVyxHQUFHO0VBQ2hCLElBQUksSUFBSSxDQUFDLENBQUM7RUFDVixJQUFJO0VBQ0osTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztFQUNsQixNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0VBQ2xCLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7RUFDbEIsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztFQUNsQixLQUFLLENBQUM7RUFDTixHQUFHO0FBQ0g7RUFDQSxFQUFFLFFBQVEsR0FBRztFQUNiLElBQUksT0FBTyxJQUFJLEtBQUssRUFBRSxDQUFDO0VBQ3ZCLEdBQUc7QUFDSDtFQUNBLEVBQUUsTUFBTSxHQUFHO0VBQ1gsSUFBSSxPQUFPLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNoRix3Q0FBd0MsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2hGLHdDQUF3QyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNqRixVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2hGLHdDQUF3QyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDaEYsd0NBQXdDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2pGLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDaEYsd0NBQXdDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNoRix3Q0FBd0MsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDakYsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNoRix3Q0FBd0MsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2hGLHdDQUF3QyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2xGLEdBQUc7QUFDSDtFQUNBLEVBQUUsWUFBWSxDQUFDLENBQUMsRUFBRTtFQUNsQixJQUFJLElBQUksQ0FBQyxDQUFDO0VBQ1YsSUFBSTtFQUNKLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7RUFDbEIsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztFQUNsQixNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0VBQ2xCLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7RUFDeEIsS0FBSyxDQUFDO0VBQ04sR0FBRztBQUNIO0VBQ0EsRUFBRSxTQUFTLENBQUMsQ0FBQyxFQUFFO0VBQ2YsSUFBSSxPQUFPLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztFQUM1QixnQkFBZ0IsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7RUFDNUIsZ0JBQWdCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0VBQzVCLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEMsR0FBRztBQUNIO0VBQ0EsRUFBRSxPQUFPLENBQUMsQ0FBQztFQUNYLEVBQUU7RUFDRixJQUFJLElBQUksQ0FBQyxHQUFHLElBQUksRUFBRSxDQUFDO0FBQ25CO0VBQ0EsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUM5RixNQUFNLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUMvQjtFQUNBLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDOUYsTUFBTSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDL0I7RUFDQSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzlGLE1BQU0sSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQy9CO0VBQ0EsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUM5RixNQUFNLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUMvQjtBQUNBO0VBQ0EsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUM5RixNQUFNLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUMvQjtFQUNBLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDOUYsTUFBTSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDL0I7RUFDQSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzlGLE1BQU0sSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQy9CO0VBQ0EsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUM5RixNQUFNLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUMvQjtBQUNBO0VBQ0EsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUM5RixNQUFNLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUMvQjtFQUNBLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDOUYsTUFBTSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDL0I7RUFDQSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzlGLE1BQU0sSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQy9CO0VBQ0EsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUM5RixNQUFNLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUMvQjtBQUNBO0VBQ0EsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUM5RixNQUFNLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUMvQjtFQUNBLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDOUYsTUFBTSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDL0I7RUFDQSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzlGLE1BQU0sSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQy9CO0VBQ0EsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUM5RixNQUFNLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUMvQjtFQUNBLElBQUksT0FBTyxDQUFDLENBQUM7RUFDYixHQUFHO0FBQ0g7RUFDQSxFQUFFLE9BQU8sR0FBRztFQUNaLElBQUksSUFBSSxDQUFDLEdBQUcsSUFBSSxFQUFFLENBQUM7RUFDbkIsSUFBSSxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7QUFDNUI7RUFDQSxJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7RUFDaEIsTUFBTSxPQUFPO0FBQ2I7RUFDQTtFQUNBLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDYixNQUFNLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUM3RCxxQkFBcUIsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzdELHFCQUFxQixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztBQUNyRTtFQUNBLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDYixNQUFNLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUM3RCxxQkFBcUIsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzdELHFCQUFxQixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztBQUNyRTtFQUNBLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDYixNQUFNLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUM3RCxxQkFBcUIsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzdELHFCQUFxQixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztBQUNyRTtFQUNBLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDYixNQUFNLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUM3RCxxQkFBcUIsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzdELHFCQUFxQixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztBQUNyRTtFQUNBLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDYixNQUFNLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUM3RCxxQkFBcUIsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzdELHFCQUFxQixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztBQUNyRTtFQUNBLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDYixNQUFNLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUM3RCxxQkFBcUIsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzdELHFCQUFxQixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztBQUNyRTtFQUNBLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDYixNQUFNLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUM3RCxxQkFBcUIsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzdELHFCQUFxQixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztBQUNyRTtFQUNBLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDYixNQUFNLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUM3RCxxQkFBcUIsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzdELHFCQUFxQixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztBQUNyRTtBQUNBO0VBQ0EsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNiLE1BQU0sQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzdELHFCQUFxQixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDN0QscUJBQXFCLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO0FBQ3JFO0VBQ0EsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNiLE1BQU0sQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzdELHFCQUFxQixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDN0QscUJBQXFCLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO0FBQ3JFO0VBQ0EsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNiLE1BQU0sQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzdELHFCQUFxQixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDN0QscUJBQXFCLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO0FBQ3JFO0VBQ0EsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNiLE1BQU0sQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzdELHFCQUFxQixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDN0QscUJBQXFCLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO0FBQ3JFO0FBQ0E7RUFDQSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2IsTUFBTSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDN0QscUJBQXFCLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUM3RCxxQkFBcUIsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7QUFDckU7RUFDQSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2IsTUFBTSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDN0QscUJBQXFCLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUM3RCxxQkFBcUIsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7QUFDckU7RUFDQSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2IsTUFBTSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDN0QscUJBQXFCLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUM3RCxxQkFBcUIsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7QUFDckU7RUFDQSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2IsTUFBTSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDN0QscUJBQXFCLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUM3RCxxQkFBcUIsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7QUFDckU7RUFDQSxJQUFJLE9BQU8sQ0FBQyxDQUFDO0VBQ2IsR0FBRztBQUNIO0VBQ0EsRUFBRSxVQUFVLEdBQUc7RUFDZixJQUFJLElBQUksQ0FBQyxHQUFHLElBQUksRUFBRSxDQUFDO0VBQ25CLElBQUksSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO0FBQzVCO0VBQ0EsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO0VBQ2hCLE1BQU0sSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO0FBQ3pCO0VBQ0E7RUFDQSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2IsTUFBTSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDN0QscUJBQXFCLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUM3RCxxQkFBcUIsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7QUFDckU7RUFDQSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2IsTUFBTSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDN0QscUJBQXFCLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUM3RCxxQkFBcUIsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7QUFDckU7RUFDQSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2IsTUFBTSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDN0QscUJBQXFCLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUM3RCxxQkFBcUIsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7QUFDckU7RUFDQSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2IsTUFBTSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDN0QscUJBQXFCLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUM3RCxxQkFBcUIsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7QUFDckU7RUFDQSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2IsTUFBTSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDN0QscUJBQXFCLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUM3RCxxQkFBcUIsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7QUFDckU7RUFDQSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2IsTUFBTSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDN0QscUJBQXFCLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUM3RCxxQkFBcUIsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7QUFDckU7RUFDQSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2IsTUFBTSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDN0QscUJBQXFCLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUM3RCxxQkFBcUIsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7QUFDckU7RUFDQSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2IsTUFBTSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDN0QscUJBQXFCLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUM3RCxxQkFBcUIsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7QUFDckU7QUFDQTtFQUNBLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDYixNQUFNLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUM3RCxxQkFBcUIsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzdELHFCQUFxQixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztBQUNyRTtFQUNBLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDYixNQUFNLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUM3RCxxQkFBcUIsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzdELHFCQUFxQixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztBQUNyRTtFQUNBLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDYixNQUFNLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUM3RCxxQkFBcUIsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzdELHFCQUFxQixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztBQUNyRTtFQUNBLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDYixNQUFNLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUM3RCxxQkFBcUIsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzdELHFCQUFxQixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztBQUNyRTtBQUNBO0VBQ0EsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNiLE1BQU0sQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzdELHFCQUFxQixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDN0QscUJBQXFCLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO0FBQ3JFO0VBQ0EsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNiLE1BQU0sQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzdELHFCQUFxQixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDN0QscUJBQXFCLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO0FBQ3JFO0VBQ0EsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNiLE1BQU0sQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzdELHFCQUFxQixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDN0QscUJBQXFCLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO0FBQ3JFO0VBQ0EsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNiLE1BQU0sQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzdELHFCQUFxQixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDN0QscUJBQXFCLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO0FBQ3JFO0VBQ0EsSUFBSSxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRTtFQUM5QixNQUFNLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFO0VBQ2pDLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2pDLEdBQUc7QUFDSDtFQUNBLEVBQUUsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDLEVBQUU7RUFDbkIsSUFBSSxJQUFJLENBQUMsR0FBRyxLQUFLLEdBQUcsSUFBSSxDQUFDLEVBQUUsR0FBRyxHQUFHLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDcEU7RUFDQSxJQUFJLE9BQU8sSUFBSTtFQUNmLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUM7RUFDaEcsUUFBUSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQztFQUNoRyxRQUFRLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDO0VBQ2hHLFFBQVEsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7RUFDcEIsR0FBRztBQUNIO0VBQ0EsRUFBRSxTQUFTLENBQUMsS0FBSyxFQUFFLENBQUMsRUFBRTtFQUN0QixJQUFJLElBQUksQ0FBQyxHQUFHLEtBQUssR0FBRyxJQUFJLENBQUMsRUFBRSxHQUFHLEdBQUcsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNwRTtFQUNBLElBQUksSUFBSSxDQUFDLENBQUM7RUFDVixJQUFJO0VBQ0osTUFBTSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUM7RUFDaEcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUM7RUFDaEcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENB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LEtBQUssR0FBRyxHQUFHLE1BQU0sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLEdBQUcsSUFBSSxLQUFLLEdBQUcsR0FBRyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFO0VBQ2hILE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEdBQUcsSUFBSSxHQUFHLEdBQUcsS0FBSyxHQUFHLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7RUFDckQsS0FBSyxDQUFDO0VBQ04sR0FBRztBQUNIO0VBQ0EsRUFBRSxTQUFTLEdBQUc7RUFDZCxJQUFJLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3RFLE1BQU0sSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDNUQsTUFBTSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUM1RCxNQUFNLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUM5RCxHQUFHO0FBQ0g7RUFDQSxFQUFFLFlBQVksR0FBRztFQUNqQixJQUFJLElBQUksQ0FBQyxDQUFDO0VBQ1YsSUFBSTtFQUNKLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzlELE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzlELE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzlELE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzlELEtBQUssQ0FBQztFQUNOLEdBQUc7QUFDSDtFQUNBLEVBQUUsT0FBTyxDQUFDLGFBQWEsRUFBRTtFQUN6QixJQUFJLElBQUksQ0FBQyxHQUFHLGFBQWEsR0FBRyxJQUFJLENBQUMsRUFBRSxHQUFHLEdBQUcsRUFBRSxFQUFFLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUM5RTtFQUNBLElBQUksT0FBTyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQztFQUMxQixnQkFBZ0IsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQztFQUM1QixnQkFBZ0IsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDO0VBQzdCLGdCQUFnQixDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztFQUM1QixHQUFHO0FBQ0g7RUFDQSxFQUFFLFVBQVUsQ0FBQyxhQUFhLEVBQUU7RUFDNUIsSUFBSSxJQUFJLENBQUMsR0FBRyxhQUFhLEdBQUcsSUFBSSxDQUFDLEVBQUUsR0FBRyxHQUFHLEVBQUUsRUFBRSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7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QUksQ0FBQyxDQUFDLEdBQUcsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDLEdBQUcsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7RUFDMUQsR0FBRztBQUNIO0VBQ0E7RUFDQSxFQUFFLE1BQU0sQ0FBQyxHQUFHLEVBQUU7RUFDZCxJQUFJLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDLEdBQUcsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7RUFDMUQsR0FBRztBQUNIO0VBQ0E7RUFDQSxFQUFFLE1BQU0sQ0FBQyxHQUFHLEVBQUU7RUFDZCxJQUFJLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDLEdBQUcsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7RUFDMUQsR0FBRztBQUNIO0VBQ0E7RUFDQSxFQUFFLE1BQU0sQ0FBQyxHQUFHLEVBQUU7RUFDZCxJQUFJLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDaEUsR0FBRztBQUNIO0VBQ0E7RUFDQSxFQUFFLE1BQU0sQ0FBQyxHQUFHLEVBQUU7RUFDZCxJQUFJLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDaEUsR0FBRztBQUNIO0VBQ0E7RUFDQSxFQUFFLEdBQUcsQ0FBQyxHQUFHLEVBQUU7RUFDWCxJQUFJLE9B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LENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUM5RSxHQUFHO0FBQ0g7RUFDQTtFQUNBLEVBQUUsT0FBTyxDQUFDLENBQUM7RUFDWCxFQUFFO0VBQ0YsSUFBSSxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3JGO0VBQ0EsSUFBSSxPQUFPLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztFQUM5RixrQkFBa0IsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7RUFDaEcsa0JBQWtCLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztFQUNsRyxHQUFHO0FBQ0g7RUFDQSxFQUFFLGNBQWMsQ0FBQyxDQUFDO0VBQ2xCLEVBQUU7RUFDRixJQUFJLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3hGLGNBQWMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDdEYsY0FBYyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDeEYsR0FBRztFQUNILENBQUM7QUFDRDtFQUNBO0VBQ08sU0FBUyxJQUFJLENBQUMsR0FBRyxJQUFJLEVBQUU7RUFDOUIsRUFBRSxPQUFPLElBQUksS0FBSyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUM7RUFDNUIsQ0FBQzs7RUN0SEQsTUFBTSxPQUFPLENBQUM7RUFDZCxFQUFFLEdBQUcsQ0FBQztFQUNOLEVBQUUsRUFBRSxDQUFDO0VBQ0wsRUFBRSxHQUFHLENBQUM7RUFDTixFQUFFLEtBQUssQ0FBQztFQUNSLEVBQUUsRUFBRSxDQUFDO0FBQ0w7RUFDQSxFQUFFLFFBQVEsQ0FBQztFQUNYLEVBQUUsUUFBUSxDQUFDO0VBQ1gsRUFBRSxNQUFNLENBQUM7QUFDVDtFQUNBLEVBQUUsTUFBTSxDQUFDO0VBQ1QsRUFBRSxNQUFNLENBQUM7QUFDVDtFQUNBLEVBQUUsRUFBRSxDQUFDO0VBQ0wsRUFBRSxFQUFFLENBQUM7RUFDTCxFQUFFLFFBQVEsQ0FBQztFQUNYLEVBQUUsUUFBUSxDQUFDO0VBQ1gsRUFBRSxXQUFXLENBQUM7QUFDZDtFQUNBLEVBQUUsV0FBVyxHQUFHO0VBQ2hCLElBQUksSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLEVBQUUsQ0FBQztFQUMzQixJQUFJLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxFQUFFLENBQUM7RUFDM0IsSUFBSSxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksRUFBRSxDQUFDO0FBQ3pCO0VBQ0EsSUFBSSxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztFQUN2QixJQUFJLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO0FBQ3ZCO0VBQ0EsSUFBSSxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztFQUN6QixJQUFJLElBQUksQ0FBQyxXQUFXLEdBQUcsR0FBRyxDQUFDO0VBQzNCLElBQUksSUFBSSxDQUFDLFFBQVEsR0FBRyxHQUFHLENBQUM7RUFDeEIsR0FBRztFQUNILEVBQUUsR0FBRyxDQUFDLEdBQUcsRUFBRSxFQUFFLEVBQUUsRUFBRTtFQUNqQixFQUFFO0VBQ0YsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0FBQ3ZDO0VBQ0EsSUFBSSxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDM0Msc0JBQXNCLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUMzQyxzQkFBc0IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUM3QyxJQUFJLElBQUksQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUN4QyxtQkFBbUIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3hDLG1CQUFtQixJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzFDLElBQUksSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDMUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDNUMsSUFBSSxJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztFQUN6QixJQUFJLElBQUksQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBQ3ZCO0VBQ0EsSUFBSSxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztFQUN2RCxHQUFHO0FBQ0g7RUFDQSxFQUFFLE9BQU8sQ0FBQyxRQUFRLEVBQUUsUUFBUSxFQUFFLFdBQVc7RUFDekMsRUFBRTtFQUNGLElBQUksSUFBSSxFQUFFLEVBQUUsRUFBRSxDQUFDO0FBQ2Y7RUFDQSxJQUFJLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO0VBQzdCLElBQUksSUFBSSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUM7RUFDbkMsSUFBSSxFQUFFLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO0FBQ3ZDO0VBQ0E7RUFDQSxJQUFJLElBQUksSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsTUFBTTtFQUNsQyxNQUFNLEVBQUUsSUFBSSxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7RUFDdEM7RUFDQSxNQUFNLEVBQUUsSUFBSSxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7QUFDdEM7RUFDQSxJQUFJLElBQUksQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDO0VBQ2pCLElBQUksSUFBSSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUM7RUFDakIsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLEVBQUUsRUFBRSxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsR0FBRyxDQUFDLEVBQUUsRUFBRSxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztFQUNoRyxJQUFJLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0VBQ3ZELEdBQUc7QUFDSDtFQUNBLEVBQUUsT0FBTyxDQUFDLE1BQU0sRUFBRSxNQUFNO0VBQ3hCLEVBQUU7RUFDRixJQUFJLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO0VBQ3pCLElBQUksSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7RUFDekIsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7RUFDakUsR0FBRztFQUNILENBQUM7QUFDRDtFQUNPLFNBQVMsTUFBTSxFQUFFO0VBQ3hCLEVBQUUsT0FBTyxJQUFJLE9BQU8sRUFBRSxDQUFDO0VBQ3ZCOztFQ2hGQSxNQUFNLGFBQWEsQ0FBQztFQUNwQixFQUFFLEVBQUUsQ0FBQztFQUNMLEVBQUUsTUFBTSxDQUFDO0VBQ1QsRUFBRSxPQUFPLENBQUM7RUFDVixFQUFFLFNBQVMsQ0FBQztFQUNaLEVBQUUsSUFBSSxDQUFDO0FBQ1A7RUFDQSxFQUFFLFFBQVEsR0FBRyxFQUFFLENBQUM7RUFDaEI7RUFDQSxFQUFFLFdBQVcsQ0FBQyxDQUFDLFFBQVEsRUFBRTtFQUN6QixJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFDO0VBQ3ZCLEdBQUc7QUFDSDtFQUNBLEVBQUUsSUFBSSxDQUFDLENBQUMsUUFBUSxFQUFFO0VBQ2xCLElBQUksSUFBSSxDQUFDLE1BQU0sR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0VBQ3BELElBQUksSUFBSSxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQztFQUMvQyxJQUFJLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxFQUFFLENBQUM7QUFDNUI7RUFDQSxJQUFJLElBQUksQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLENBQUM7RUFDdkMsSUFBSSxNQUFNLElBQUksR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDO0VBQzVCLElBQUksSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxVQUFVLEVBQUUsR0FBRyxFQUFFO0VBQ3ZELFlBQVksSUFBSSxDQUFDLFVBQVUsRUFBRTtFQUM3QixZQUFZLElBQUksQ0FBQyxlQUFlLEVBQUUsR0FBRyxJQUFJLENBQUM7QUFDMUM7RUFDQSxJQUFJLElBQUksQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQzNDO0VBQ0EsR0FBRztBQUNIO0VBQ0EsRUFBRSxTQUFTLEdBQUc7RUFDZCxJQUFJLE1BQU0sSUFBSSxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7RUFDNUIsSUFBSSxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxVQUFVLEVBQUUsR0FBRyxFQUFFO0VBQ3RDLFlBQVksSUFBSSxDQUFDLFVBQVUsRUFBRTtFQUM3QixZQUFZLElBQUksQ0FBQyxlQUFlLEVBQUUsR0FBRyxJQUFJLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQztBQUMzRDtFQUNBLElBQUksSUFBSSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0VBQzVDLEdBQUc7QUFDSDtFQUNBLEVBQUUsUUFBUSxDQUFDLENBQUMsRUFBRTtFQUNkLElBQUksQ0FBQyxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLENBQUM7QUFDN0I7RUFDQTtFQUNBLElBQUksSUFBSSxFQUFFLEdBQUcsSUFBSSxFQUFFLENBQUMsTUFBTSxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUM7RUFDdEUsSUFBSSxJQUFJLElBQUksR0FBRyxFQUFFLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7RUFDL0MsSUFBSSxJQUFJLEtBQUssR0FBRyxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUMsU0FBUyxFQUFFLENBQUM7QUFDekM7RUFDQSxJQUFJLElBQUksQ0FBQyxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxJQUFJLFNBQVM7RUFDekQsTUFBTSxJQUFJLENBQUMsRUFBRSxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxHQUFHLEVBQUUsS0FBSyxFQUFFLElBQUksWUFBWSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUM7RUFDbEgsSUFBSSxJQUFJLENBQUMsQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsSUFBSSxTQUFTO0VBQ3ZELE1BQU0sSUFBSSxDQUFDLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxFQUFFLEtBQUssRUFBRSxJQUFJLFlBQVksQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDO0VBQzlHLElBQUksSUFBSSxDQUFDLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLElBQUksU0FBUztFQUMxRCxNQUFNLElBQUksQ0FBQyxFQUFFLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDLEdBQUcsRUFBRSxLQUFLLEVBQUUsSUFBSSxZQUFZLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQztFQUNwSCxJQUFJLElBQUksQ0FBQyxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLFNBQVM7RUFDdEQsTUFBTSxJQUFJLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUMxRTtFQUNBLElBQUksSUFBSSxDQUFDLEVBQUUsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0VBQzNDLElBQUksSUFBSSxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDO0VBQzdELElBQUksSUFBSSxDQUFDLENBQUMsV0FBVyxJQUFJLFNBQVMsRUFBRTtFQUNwQyxN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LFFBQVEsQ0FBQyxNQUFNLEdBQUc7RUFDNUMsUUFBUSxJQUFJLEVBQUUsR0FBRyxRQUFRLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0VBQzdELFFBQVEsSUFBSSxFQUFFLEdBQUcsUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUM3RDtFQUNBLFFBQVEsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQztFQUM3QjtFQUNBLFFBQVEsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUN0RCxRQUFRLFFBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxHQUFHLFFBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUM5RCxRQUFRLFFBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxHQUFHLFFBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUM5RDtFQUNBLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztFQUNmLE9BQU87RUFDUCxLQUFLLE1BQU07RUFDWCxNQUFNLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxPQUFPLENBQUMsTUFBTSxJQUFJO0VBQzVDLFFBQVEsSUFBSSxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksT0FBTyxDQUFDLENBQUMsR0FBRyxD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QUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0VBQ2pDLEdBQUcsQ0FBQztFQUNKO0VBQ0EsRUFBRSxJQUFJLEdBQUcsR0FBRztFQUNaLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztFQUNsQixJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7RUFDbEIsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0VBQ2xCLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztFQUNsQixJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7RUFDbEIsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0VBQ2xCLEdBQUcsQ0FBQztBQUNKO0VBQ0EsRUFBRSxJQUFJLEtBQUssR0FBRztFQUNkLElBQUksSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7RUFDakMsSUFBSSxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztFQUNqQyxJQUFJLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0VBQ2pDLElBQUc7QUFDSDtFQUNBLEVBQUUsSUFBSSxJQUFJLEdBQUcsRUFBRSxDQUFDO0FBQ2hCO0VBQ0EsRUFBRSxJQUFJLElBQUksR0FBRyxFQUFFLENBQUM7QUFDaEI7RUFDQSxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztFQUNaLEVBQUUsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7RUFDdkMsSUFBSSxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRTtFQUN0QixNQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzdFLE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNuQixNQUFNLENBQUMsRUFBRSxDQUFDO0VBQ1YsS0FBSztFQUNMO0VBQ0EsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEIsR0FBRztBQUNIO0VBQ0EsRUFBRSxJQUFJLFNBQVMsR0FBRyxNQUFNLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNuRDtFQUNBLEVBQUUsT0FBTyxJQUFJLENBQUMsTUFBTSxFQUFFLGdCQUFnQixFQUFFLFNBQVMsRUFBRSxJQUFJLENBQUMsQ0FBQztFQUN6RCxDQUFDO0FBQ0Q7RUFDTyxTQUFTLFNBQVMsQ0FBQyxNQUFNLEVBQUUsSUFBSSxFQUFFO0VBQ3hDLEVBQUUsSUFBSSxJQUFJLEdBQUc7RUFDYixJQUFJLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztFQUNoQyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7RUFDbEMsSUFBSSxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztFQUNqQyxHQUFHLENBQUM7RUFDSjtFQUNBLEVBQUUsSUFBSSxHQUFHLEdBQUc7RUFDWixJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQztFQUNYLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDO0VBQ1gsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7RUFDWCxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQztFQUNYLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDO0VBQ1gsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7RUFDWCxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQztFQUNYLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDO0VBQ1gsR0FBRyxDQUFDO0FBQ0o7RUFDQSxFQUFFLElBQUksSUFBSSxHQUFHLEVBQUUsQ0FBQztBQUdoQjtFQUNBLEVBQUUsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7RUFDdkMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNqRCxHQUFHO0FBQ0g7RUFDQSxFQUFFLElBQUksR0FBRyxNQUFNLEVBQUUsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDbkM7RUFDQSxFQUFFLElBQUksU0FBUyxHQUFHLE1BQU0sRUFBRSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ25EO0VBQ0EsRUFBRSxPQUFPLElBQUksQ0FBQyxNQUFNLEVBQUUsV0FBVyxFQUFFLFNBQVMsQ0FBQyxDQUFDO0FBQzlDO0VBQ0EsQ0FBQztBQUNEO0VBQ08sU0FBUyxVQUFVLENBQUMsTUFBTSxFQUFFLElBQUksRUFBRTtFQUN6QyxFQUFFLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDN0IsRUFBRSxNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztBQUNsQztFQUNBLEVBQUUsSUFBSSxFQUFFLEdBQUc7RUFDWCxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQztFQUN0RyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDO0VBQ25HLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQztFQUMvRixJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQztFQUNoRyxHQUFHLENBQUM7QUFDSjtFQUNBLEVBQUUsRUFBRSxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksS0FBSztFQUN2QixJQUFJLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7RUFDckMsR0FBRyxFQUFDO0FBQ0o7RUFDQSxFQUFFLEVBQUUsR0FBRyxNQUFNLEVBQUUsQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLENBQUM7QUFDL0I7RUFDQSxFQUFFLEVBQUUsR0FBRyxNQUFNLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQyxFQUFFLENBQUMsQ0FBQztBQUN0QztFQUNBLEVBQUUsT0FBTyxJQUFJLENBQUMsTUFBTSxFQUFFLFdBQVcsRUFBRSxFQUFFLENBQUMsQ0FBQztFQUN2QyxDQUFDO0FBQ0Q7RUFDTyxTQUFTLFNBQVMsQ0FBQyxNQUFNLEVBQUUsSUFBSSxFQUFFO0VBQ3hDLEVBQ0csTUFBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FFVTtBQUN6QztFQUNBLEVBQUUsSUFBSSxJQUFJLEdBQUc7RUFDYixJQUFJLElBQUksQ0FBQyxDQUFDLEVBQUUsT0FBTyxFQUFFLENBQUMsQ0FBQztFQUN2QixJQUFHO0FBQ0g7RUFDQSxFQUFFLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7RUFDOUIsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsSUFBSSxJQUFJLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsSUFBSSxJQUFJLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUMvRixHQUFHO0FBQ0g7RUFDQSxFQUFFLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7RUFDOUIsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxJQUFJLElBQUksQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsSUFBSSxJQUFJLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNsRyxHQUFHO0FBQ0g7RUFDQSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ2xDO0VBQ0EsRUFBRSxJQUFJLEdBQUcsR0FBRztFQUNaLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDO0VBQ1gsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7RUFDWCxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQztFQUNYLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDO0VBQ1gsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7RUFDWCxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQztFQUNYLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDO0VBQ1gsSUFBSSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUM7RUFDWixJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtFQUNaLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO0VBQ1osSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7RUFDWCxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQztFQUNYLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDO0VBQ1gsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7RUFDWCxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQztFQUNYLElBQUksRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDO0VBQ1osSUFBSSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUM7RUFDWixJQUFJLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQztFQUNaLElBQUksRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFO0VBQ2IsSUFBSSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUM7RUFDYixHQUFHLENBQUM7QUFDSjtFQUNBLEVBQUUsSUFBSSxJQUFJLEdBQUcsRUFBRSxDQUFDO0FBQ2hCO0VBQ0EsRUFBRSxLQUFLLElBQUksQ0FBQyxJQUFJLEdBQUcsRUFBRTtFQUNyQixJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2pELEdBQUc7QUFDSDtFQUNBLEVBQUUsTUFBTSxFQUFFLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO0VBQzVCO0VBQ0EsRUFBRSxJQUFJLFNBQVMsR0FBRyxNQUFNLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNuRDtFQUNBLEVBQUUsT0FBTyxJQUFJLENBQUMsTUFBTSxFQUFFLFdBQVcsRUFBRSxTQUFTLENBQUMsQ0FBQztFQUM5QyxDQUFDO0FBQ0Q7RUFDTyxTQUFTLFdBQVcsQ0FBQyxNQUFNLEVBQUUsSUFBSSxFQUFFO0VBQzFDLEVBQ0csTUFBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FFVTtBQUN6QztFQUNBLEVBQUUsSUFBSSxLQUFLLEdBQUc7RUFDZCxJQUFJLElBQUksQ0FBQyxDQUFDLEVBQUUsT0FBTyxFQUFFLENBQUMsQ0FBQztFQUN2QixJQUFHO0FBQ0g7RUFDQSxFQUFFLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7RUFDOUIsSUFBSSxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsSUFBSSxJQUFJLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsSUFBSSxJQUFJLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNoRyxHQUFHO0FBQ0g7RUFDQSxFQUFFLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7RUFDOUIsSUFBSSxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxJQUFJLElBQUksQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsSUFBSSxJQUFJLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNuRyxHQUFHO0FBQ0g7RUFDQSxFQUFFLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ25DO0VBQ0EsRUFBRSxJQUFJLEdBQUcsR0FBRztFQUNaLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDO0VBQ1gsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7RUFDWCxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQztFQUNYLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDO0VBQ1gsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7RUFDWCxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQztFQUNYLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDO0VBQ1gsSUFBSSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUM7RUFDWixJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtFQUNaLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO0VBQ1osSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7RUFDWCxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQztFQUNYLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDO0VBQ1gsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7RUFDWCxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQztFQUNYLElBQUksRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDO0VBQ1osSUFBSSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUM7RUFDWixJQUFJLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQztFQUNaLElBQUksRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFO0VBQ2IsSUFBSSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUM7RUFDYixHQUFHLENBQUM7QUFDSjtFQUNBLEVBQUUsSUFBSSxLQUFLLEdBQUcsRUFBRSxDQUFDO0FBQ2pCO0VBQ0EsRUFBRSxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFO0VBQzFDLElBQUksS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzVGLEdBQUc7QUFDSDtFQUNBLEVBQUUsSUFBSSxPQUFPLEdBQUc7RUFDaEIsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7RUFDN0IsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7RUFDN0IsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7RUFDL0IsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUU7RUFDbEMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUU7RUFDbEMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7RUFDOUIsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUU7RUFDaEMsSUFBSSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUU7RUFDbkMsSUFBSSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUU7RUFDdEMsSUFBSSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUU7RUFDcEMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUU7RUFDaEMsSUFBSSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUU7RUFDdEMsSUFBRztBQUNIO0VBQ0EsRUFBRSxJQUFJLElBQUksR0FBRyxFQUFFLENBQUM7QUFDaEI7RUFDQSxFQUFFLEtBQUssSUFBSSxDQUFDLElBQUksT0FBTyxFQUFFO0VBQ3pCLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDdEQsR0FBRztBQUNIO0VBQ0EsRUFBRSxNQUFNLEVBQUUsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7RUFDNUI7RUFDQSxFQUFF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dkMsS0FBSyxDQUFDO0FBQ047QUFDQTtBQUNBO0VBQ0EsRUFBYSxPQUFPLENBQUMsR0FBRztBQUN4QjtFQUNBO0FBQ0E7RUFDQSxFQUFFLFNBQVMsQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEdBQUcsV0FBVyxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTTtFQUN2RixJQUFJLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2QsQ0FBQztBQUNEO0FBQ0E7RUFDQSxNQUFNLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxFQUFFLE1BQU07RUFDdEMsRUFBRSxLQUFLLEVBQUUsQ0FBQztFQUNWLEVBQUUsS0FBSyxFQUFFLENBQUM7RUFDVixFQUFFLEtBQUssRUFBRSxDQUFDO0VBQ1YsRUFBRSxLQUFLLEVBQUUsQ0FBQztFQUNWLEVBQUUsS0FBSyxFQUFFLENBQUM7RUFDVixDQUFDLENBQUM7Ozs7OzsifQ==
