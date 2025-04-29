import { motion, AnimatePresence } from 'framer-motion';

function ForecastCard({ data, isExpanded, onClick }) {
  const dayName = new Date(data.date).toLocaleDateString(undefined, {
    weekday: 'long',
  });

  return (
    <div
      className="bg-white rounded-lg shadow p-4 transition-all cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">{dayName}</h3>
          <p className="text-sm capitalize">{data.description}</p>
        </div>
        <div className="flex items-center gap-2">
          <img
            src={`https://openweathermap.org/img/wn/${data.icon}.png`}
            alt={data.description}
            className="w-10 h-10"
          />
          <span className="text-xl font-bold">{Math.round(data.temp)}°C</span>
        </div>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden mt-4 border-t pt-2 space-y-1 text-sm text-gray-700"
          >
            {data.list.map((hour) => (
              <div key={hour.dt} className="flex justify-between">
                <span>{hour.dt_txt.split(' ')[1].slice(0, 5)}</span>
                <span>{Math.round(hour.main.temp)}°C</span>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default ForecastCard;
