import React, { useState, useEffect } from "react";
import theme from "theme/index";

const StudyMaterial: React.FC = () => {
    const [materials, setMaterials] = useState([]);

    const getStudyMaterials = async () => {
        try {
            const response = await fetch('/api/study_materials');
            const data = await response.json();
            if (!response.ok) throw new Error(data.message);

            setMaterials(data);
        } catch (error) {

        }
    }

    useEffect(() => {
        getStudyMaterials();
    }, []);

    return (
        <div className="mt-6">
            <div className="flex flex-row px-4 py-2">
                <ul className="list-disc" >
                    {materials.map(material => (
                        <li key={material._id} style={{ color: theme.colors.violet }} className="text-white py-1"><a href={material.link} target="_blank">{material.title}</a></li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default StudyMaterial;