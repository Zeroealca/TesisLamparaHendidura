import { useState, useEffect } from "react"
import { GETALLTECHNIQUE } from "./getTechnique"

interface Techniques {
    id_technique: number,
    name: string,
    description: string,
    assess: string,
    imageNormal: string,
    imageTechnique: string,
    lightingAngle: string,
    magnification: string,
    short_description: string,
}
export const useGetAllTechnique = () => {
    const [techniques, setTechniques] = useState<Techniques[]>([])
    useEffect(() => {
        const res = GETALLTECHNIQUE()
        res.then(res => res.json()).then(res => setTechniques(res.data))
    }, [])
    return {
        techniques
    }
}
