/*const { Activity, CountryActivities } = require('../db');

const deleteactivity = async (req, res) => {
    try {
        const { ID, db_id } = req.params;

        // Eliminar las relaciones en la tabla CountryActivities
        await CountryActivities.destroy({
            where: {
                ActivityId: ID,
                CountryDbId: db_id,
            },
        });

        // Verificar si aún existen relaciones en la tabla CountryActivities
        const remainingRelations = await CountryActivities.findOne({
            where: {
                ActivityId: ID,
            },
        });

        if (remainingRelations) {
            // Aún existen relaciones, se devuelve una respuesta con un mensaje correspondiente
            return res.status(200).json({ message: 'Se han eliminado las relaciones.' });
        } else {
            // No quedan relaciones, eliminar la actividad
            await Activity.destroy({
                where: {
                    ID: ID,
                },
            });
            return res.status(200).json({ message: 'La actividad y sus relaciones han sido eliminadas.' });
        }
    } catch (error) {
        return res.status(500).json({ message: 'Error al eliminar las relaciones y la actividad.', error: error.message });
    }
};

module.exports = {
    deleteactivity,
};*/
