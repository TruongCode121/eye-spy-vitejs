import React, { useRef, useState } from "react";

const InputFiles = () => {
  const [images, setImages] = useState([]);
  const fileRef = useRef(null);
  const handleSelectFile = () => {
    fileRef.current.click();
  };
  const onFileSelect = (e) => {
    // let newArr = [];
    const files = e.target.files;
    if (files.length === 0) return;
    for (let i = 0; i < files.length; i++) {
      if (files[i].type.split("/")[0] !== "image") continue;
      if (!images.some((e) => e.name === files[i].name)) {
        setImages((preImages) => [
          ...preImages,
          {
            id: uuidv4(),
            name: files[i].name,
            url: URL.createObjectURL(files[i]),
          },
        ]);
      }
    }
  };
  const deleteImg = (id) => {
    let newArr = [];
    images.filter((item, index) => {
      if (item.id != id) {
        console.log(item);
        newArr = [...newArr, item];
      }
    });
    setImages(newArr);
  };
  return (
    <div className="mb-3">
      <div
        className="w-full p-2           
    border-dashed border-2 
  rounded cursor-pointer
  border-cyan-500"
        onClick={handleSelectFile}
      >
        <input
          type="file"
          multiple
          ref={fileRef}
          className="d-none"
          onChange={onFileSelect}
        />
        <h1 className="flex-col flex items-center text-xl gap-x-3 justify-center text-gray-600 font-medium">
          <CloudDoneIcon></CloudDoneIcon>
          <span>Choose file in computer!</span>
        </h1>
      </div>
      <div className="grid gap-4 mt-2  grid-cols-4 w-full ">
        {images.length > 0 &&
          images.map((item, i) => (
            <div
              className="w-full rounded relative text-cyan-500"
              key={item.id}
            >
              <img
                src={item.url}
                alt={item.name}
                className="w-full h-20 object-cover"
              />
              <div
                className="absolute top-0 right-0 bg-white rounded-full hover:text-red-500"
                onClick={() => deleteImg(item.id)}
              >
                <CloseIcon
                  sx={{ fontSize: "17px", m: "3px", cursor: "pointer" }}
                ></CloseIcon>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default InputFiles;
