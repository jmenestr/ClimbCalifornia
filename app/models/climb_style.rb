# == Schema Information
#
# Table name: climb_styles
#
#  id         :integer          not null, primary key
#  name       :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class ClimbStyle < ActiveRecord::Base
end
