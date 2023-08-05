import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/authContext";
import { makeRequest } from "../../axios";
import "./comparator.scss";

const Comparator = ({ acaraId }) => {
    const { currentUser } = useContext(AuthContext);

    const folderPath = "/invoice";

    const [similarImages, setSimilarImages] = useState([]);
    const [imageNames, setImageNames] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const getInvoiceData = async () => {
            try {
                if (acaraId) {
                    const res = await makeRequest.get("/invoice/" + acaraId);
                    const extractedInvoicePics = res.data.map((item) => item.invoicePic);
                    setImageNames(extractedInvoicePics);
                }
            } catch (error) {
                console.log(error);
            }
        };

        getInvoiceData();
    }, [acaraId]);

    const getImageBlob = async (imageName) => {
        const response = await fetch(`${folderPath}/${imageName}`);
        const blob = await response.blob();
        return blob;
    };

    const updateSimilarImages = async () => {
        setIsLoading(true);

        if (imageNames.length > 0) {
            const similarPairs = [];

            for (let i = 0; i < imageNames.length; i++) {
                for (let j = i + 1; j < imageNames.length; j++) {
                    const image1Blob = await getImageBlob(imageNames[i]);
                    const image2Blob = await getImageBlob(imageNames[j]);

                    const formData = new FormData();
                    formData.append("image1", image1Blob);
                    formData.append("image2", image2Blob);

                    const result = await makeRequest.post(`/invoice`, formData);

                    if (result.data === "Images match") {
                        similarPairs.push([imageNames[i], imageNames[j]]);
                    }
                }
            }
            setSimilarImages(similarPairs);
        }

        setIsLoading(false);
    };

    return (
        <div className="comparator">
                {
                    imageNames.length > 0 &&
                    <button onClick={updateSimilarImages} disabled={isLoading}>
                        {isLoading ? "Memproses..." : "Tampilkan"}
                    </button>
                }
            
            <div className="image-gallery">
                {similarImages.length > 0 && (
                    <div className="item">
                        {similarImages.map((pair, index) => (
                            <div key={index}>
                                <img src={`./invoice/` + pair[0]} alt="" />
                                <img src={`./invoice/` + pair[1]} alt="" />
                            </div>
                        ))}
                    </div>
                )}
                {
                    (imageNames.length == 0)&&
                    <p>
                        Tidak ada invoice
                    </p>
                }
                {
                    (imageNames.length > 0 && similarImages.length == 0)&&
                    <p>
                        Belum ada gambar serupa
                    </p>
                }
            </div>
        </div>
    );
};

export default Comparator;
